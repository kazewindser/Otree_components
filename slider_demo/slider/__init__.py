from otree.api import *


doc = """
Slider example
"""


class Constants(BaseConstants):
    name_in_url = "slider"
    players_per_group = None
    num_rounds = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    number = models.IntegerField()
    check = models.IntegerField(initial=999)


# PAGES
class SliderPage(Page):
    timeout_seconds = 30
    form_model = "player"
    form_fields = ["number","check"]


class Results(Page):
    pass


page_sequence = [SliderPage, Results]
