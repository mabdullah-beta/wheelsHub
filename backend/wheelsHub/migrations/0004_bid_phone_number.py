# Generated by Django 4.2.16 on 2024-11-12 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wheelshub', '0003_rename_buyer_id_bid_buyer_rename_deal_id_bid_deal'),
    ]

    operations = [
        migrations.AddField(
            model_name='bid',
            name='phone_number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
