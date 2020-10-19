# coding: utf-8
from celery import Celery
from django.conf import settings
import os

# 为celery设置环境变量
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DjangoRestAuth.settings')

# 创建应用
app = Celery('testcelery')
from  DjangoRestAuth.config.celeryconfig import CeleryConfig
app.config_from_object(CeleryConfig)
# # 酸配置应用
# app.conf.update(
#
#     # 本地Redis服务器
#     BROKER_URL='redis://127.0.0.1:6379/2',
#     CELERYD_HIJACK_ROOT_LOGGER = False # 拦截根日志配置
# )

app.autodiscover_tasks(settings.INSTALLED_APPS)