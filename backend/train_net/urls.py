from django.conf.urls import url, include
from train_net.views import *
from rest_framework import routers
router = routers.DefaultRouter()
# router.register(r'list', KeyListViewSet)
urlpatterns = [
    url(r'^run_neural_net', run_neural_net.as_view()),
    url(r'^websocket/(?P<executionId>\w+)', echo_once),
    # url(r'^accept_key/(?P<ids>.+)$',accept_key),
    # url(r'^', include(router.urls)),
    # url(r'^export',Key_Export.as_view()),
]
