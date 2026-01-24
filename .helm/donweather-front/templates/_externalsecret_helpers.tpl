{{/*
External secret target name
*/}}
{{- define "donweather-front.externalSecretTargetName" -}}
{{- $defaultName := printf "%s-external" (include "donweather-front.fullname" .) -}}
{{- default $defaultName .Values.externalSecret.target.name -}}
{{- end -}}

