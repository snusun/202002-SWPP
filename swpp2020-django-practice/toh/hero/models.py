from django.db import models

# Create your models here.

class Hero(models.Model):
    name = models.CharField(max_length=120)
    age = models.IntegerField(default=0)
    score = models.IntegerField(default=0)

    def __str__(self):
        #various formats
        #return f"{self.name}, {self.age}"
        #return self.name + ", " + str(self.age)
        return "{}, {}".format(self.name, self.age)

    def introduce(self):
        return 'Hello, my name is {} and my score is {}!'.format(self.name, self.score)    
        
class Team(models.Model):
    name = models.CharField(max_length=120)
    leader = models.ForeignKey(
        Hero,
        on_delete = models.CASCADE,
        related_name = 'leader_set',
    )
    members = models.ManyToManyField(
        Hero,
        related_name = 'teams'
    )

    def __str__(self):
        return self.name