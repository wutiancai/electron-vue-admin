
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView)
from DjangoRestAuth.views import ModsView,GetText,SwaggerSchemaView
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer
from django.conf.urls import url,include

# 下面是刚才自定义的schema


schema_view = get_schema_view(title='API', renderer_classes=[OpenAPIRenderer, SwaggerUIRenderer])
urlpatterns = [
    path('admin/', admin.site.urls),
    # Path to obtain a new access and refresh token
    path('django-api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Submit your refresh token to this path to obtain a new access token
    path('django-api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Return 'Mods' model objects
    path('django-api/mods/', ModsView.as_view(), name='mods_view'),
    path('django-api/gettext/', GetText.as_view(), name='gettext'),
    # path('docs/', schema_view, name='docs'), # 线上环境中，最好去掉
    url(r"^api-docs/$", SwaggerSchemaView.as_view()),
    url(r'^django-api/train/', include("train_net.urls")),
]
