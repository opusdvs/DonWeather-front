## DonWeather Front Helm Chart

Chart лежит в `.helm/donweather-front/`: `Chart.yaml`, `values.yaml`, `templates/*`.

### Быстрый старт

Рендер шаблонов:

```bash
helm template donweather-front ./.helm/donweather-front
```

Установка:

```bash
helm install donweather-front ./.helm/donweather-front -n donweather --create-namespace
```

### HTTPRoute (Gateway API)

Включить HTTPRoute:

```yaml
httpRoute:
  enabled: true
  # HTTPS route (прицепить к HTTPS listener)
  parentRefs:
    - name: my-gateway
      namespace: default
      sectionName: https
  hostnames:
    - donweather.example.com
  pathPrefix: /
```

Redirect 80 -> 443 (HTTP -> HTTPS) делается отдельным HTTPRoute с `RequestRedirect`:

```yaml
httpRoute:
  enabled: true
  redirectToHttps:
    enabled: true
    # ВАЖНО: parentRefs должны ссылаться на HTTP listener (sectionName=http),
    # иначе можно получить redirect-loop на HTTPS listener.
    parentRefs:
      - name: my-gateway
        namespace: default
        sectionName: http
```

### Про API (`VITE_API_ENDPOINT`)

Фронт — SPA, собирается Vite'ом, поэтому `VITE_API_ENDPOINT` подставляется **на этапе сборки Docker-образа**.

Практичный вариант для Kubernetes:
- собирать фронт с `VITE_API_ENDPOINT=""` (тогда запросы уйдут на относительный `/weather/...`)
- и маршрутизировать `/weather/*` к бэкенду через Gateway API (обычно отдельным HTTPRoute на backend service).

