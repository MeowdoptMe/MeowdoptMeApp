from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from userAuth.models import User

from .permissions import UserManageViewPermission, UserManageDetailPermission
from .serializers import UserSerializer


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserManageViewPermission]


class UserDetail(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserManageDetailPermission]
    lookup_field = "pk"
