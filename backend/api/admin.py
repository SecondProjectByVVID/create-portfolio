from django.contrib import admin
from .models import Profile, Portfolio, PortfolioImage

class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1

class PortfolioAdmin(admin.ModelAdmin):
    inlines = [PortfolioImageInline]

admin.site.register(Profile)
admin.site.register(Portfolio, PortfolioAdmin)