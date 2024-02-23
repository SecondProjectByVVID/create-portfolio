from django.contrib import admin

from .models import Profile, Portfolio, PortfolioImage, Playlist,  ContactUs

class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1

class PortfolioAdmin(admin.ModelAdmin):
    inlines = [PortfolioImageInline]
    
class PlaylistAdmin(admin.ModelAdmin):
    model = Playlist
    
class ContactUsAdmin(admin.ModelAdmin):
    model = ContactUs

admin.site.register(Profile)
admin.site.register(Portfolio, PortfolioAdmin)
admin.site.register(Playlist, PlaylistAdmin)
admin.site.register(ContactUs, ContactUsAdmin)
