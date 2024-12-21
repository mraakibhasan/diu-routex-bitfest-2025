from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('apps.authkit.urls')),
    path('api/v1/', include('apps.racipe.urls')),
]
