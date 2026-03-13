from django.contrib import admin
from .models import Notificacao, Violado, Violacao, Violador


admin.site.register(Notificacao)
admin.site.register(Violado)
admin.site.register(Violacao)
admin.site.register(Violador)
