# Generated by Django 4.2.16 on 2024-11-12 13:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wheelshub', '0006_bid_unlocked'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bid',
            name='unlocked',
        ),
    ]