from rest_framework import permissions


class IsNotAuthenticated(permissions.BasePermission):
    """
    Custom permission to only allow access to non-authenticated users.
    """
    def has_permission(self, request, view):
        return not request.user.is_authenticated
