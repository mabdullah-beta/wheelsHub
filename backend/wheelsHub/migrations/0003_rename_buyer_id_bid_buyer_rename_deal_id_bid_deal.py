# Generated by Django 4.2.16 on 2024-11-11 21:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wheelshub', '0002_bid_alter_deal_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bid',
            old_name='buyer_id',
            new_name='buyer',
        ),
        migrations.RenameField(
            model_name='bid',
            old_name='deal_id',
            new_name='deal',
        ),
    ]
