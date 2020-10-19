from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from DjangoRestAuth.models import Mods
from DjangoRestAuth.serializers import ModSerializer
from DjangoRestAuth.publicApi import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.schemas import SchemaGenerator
from rest_framework.schemas.generators import LinkNode, insert_into
from rest_framework.renderers import *
from rest_framework_swagger import renderers
from rest_framework.response import Response
from rest_framework.views import APIView

# View for 'Mods' model
class ModsView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)  # checks if user is authenticated to view the model objects

    def get_queryset(self):
        return Mods.objects.all()  # return all model objects

    def get(self, request, *args, **kwargs):  # GET request handler for the model
        queryset = self.get_queryset()
        serializer = ModSerializer(queryset, many=True)
        return Response(serializer.data)
class MySchemaGenerator(SchemaGenerator):

    def get_links(self, request=None):
        # from rest_framework.schemas.generators import LinkNode,
        links = LinkNode()

        paths = []
        view_endpoints = []
        for path, method, callback in self.endpoints:
            view = self.create_view(callback, method, request)
            path = self.coerce_path(path, method, view)
            paths.append(path)
            view_endpoints.append((path, method, view))

        # Only generate the path prefix for paths that will be included
        if not paths:
            return None
        prefix = self.determine_path_prefix(paths)

        for path, method, view in view_endpoints:
            if not self.has_view_permissions(path, method, view):
                continue
            link = view.schema.get_link(path, method, base_url=self.url)
            # 添加下面这一行方便在views编写过程中自定义参数.
            link._fields += self.get_core_fields(view)

            subpath = path[len(prefix):]
            keys = self.get_keys(subpath, method, view)

            # from rest_framework.schemas.generators import LinkNode, insert_into
            insert_into(links, keys, link)

        return links

    # 从类中取出我们自定义的参数, 交给swagger 以生成接口文档.
    def get_core_fields(self, view):
        return getattr(view, 'coreapi_fields', ())


class SwaggerSchemaView(APIView):
    _ignore_model_permissions = True
    exclude_from_schema = True

    # from rest_framework.permissions import AllowAny
    # permission_classes = [AllowAny]
    # from rest_framework_swagger import renderers
    # from rest_framework.renderers import *
    renderer_classes = [
        CoreJSONRenderer,
        renderers.OpenAPIRenderer,
        renderers.SwaggerUIRenderer
    ]

    def get(self, request):
        generator = MySchemaGenerator(title='restful',
                                      description='''Api''')

        schema = generator.get_schema(request=request)

        # from rest_framework.response import Response
        return Response(schema)

# @api_view(["POST"])
# def gettext(request):
#     return Response({"test":'33'})
class GetText(APIView):

    '''
    安装Windows代理
    '''
    coreapi_fields = (
        DocParam("username", description='用户名', required=True),
        DocParam("password", description='密码'),

    )
    def post(self, request, *args, **kwargs):
        username = get_parameter_dic(request)['username']
        password = get_parameter_dic(request)['password']
        return Response({"username": username, 'password': password})


