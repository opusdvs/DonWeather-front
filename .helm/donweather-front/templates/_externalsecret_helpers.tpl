{{/*
External secret target name
*/}}
{{- define "donweather-front.externalSecretTargetName" -}}
{{- $defaultName := printf "%s-external" (include "donweather-front.fullname" .) -}}
{{- $target := .Values.externalSecret.target | default dict -}}
{{- default $defaultName $target.name -}}
{{- end -}}

