import os
from os.path import exists
def get_base_path(req):
    return 'applications/'+req.application

def index():
    dir = get_base_path(request) + '/static/js/home/build/static'
    jsItems = os.listdir(dir+'/js')
    cssItems = os.listdir(dir+'/css')
    jsFiles = [f for f in jsItems if f[-2:] == 'js' and f[:4] == 'main']
    cssFiles = [f for f in cssItems if f[-3:] == 'css' and f[:4] == 'main']
    return dict(
        message=T('you are home'),
        cssFile=cssFiles[0],
        jsFile=jsFiles[0],
        appName=request.application
    )

def get_file_path(req):
    user_id = auth.user.id
    return get_base_path(req) + '/static/state_' + str(user_id) + '.txt'

def get_archive_path(req, data_key):
    return get_base_path(req) + '/static/archive/state_' + data_key + '.txt'

def default_user_content():
    return 'empty'

@auth.requires_login()
def load_data():
    user_id = auth.user.id
    if exists(get_file_path(request)):
        f = open(get_file_path(request), "r")
        return response.json(dict(content=f.read(), status='success'))
    else:
        return response.json(dict(content=default_user_content(), status='success'))

@auth.requires_login()
def save_data():
    data_to_save = request.vars['content']
    f = open(get_file_path(request), "w")
    f.write(data_to_save)
    f.close()
    return response.json(dict(status='success'))
def get_types():
    return {
        'paladin': 1,
        'druid': 2,
        'wizard': 3,
        'cleric': 4,
        'monk': 5,
        'barbarian': 6,
        'rogue': 7,
        'ranger': 8,
        'bard': 9,
        'fighter': 10,
        'sorcerer': 11,
        'warlock': 12
    }
def get_questions():
    types = get_types()
    questions = [
        {
            "text": "The most important part of a battle is looting the bodies of your enemies.",
            "exclusion_group": 1
        },
        {
            "text": "Devotion to a cause is foolish. It prevents one from being opportunistic. ",
            "exclusion_group": 1
        },
        {
            "text": "Morality is a subjective term and it is open to interpretation",
            "exclusion_group": 1
        },
        {
            "text": "Your loyalty to those you serve must come before your personal ideals. ",
            "exclusion_group": 1
        },
        {
            "text": "Conviction is irrelevant. Skill and luck are the only thing that matters in a conflict",
            "exclusion_group": 1
        },
        {
            "text": "If your enemies are hiding in a forest, you could burn it to destroy their cover.",
            "exclusion_group": 2
        },
        {
            "text": "There is nothing natural in magic. The ability to cast spells is a testament to our superiority over the animals",
            "exclusion_group": 2
        },
        {
            "text": "Equilibrium breeds mediocrity.",
            "exclusion_group": 2
        },
        {
            "text": "Animals exist to serve us, when they are no longer of use, they are on their own.",
            "exclusion_group": 2
        },
        {
            "text": "No land is sacred, home is wherever you keep your things",
            "exclusion_group": 2
        },
        {
            "text": "In the art of magic, will and determination is more important than intellect. ",
            "exclusion_group": 3
        },
        {
            "text": "Magic can be a curse of gift but it is never a choice",
            "exclusion_group": 3
        },
        {
            "text": "The study of magic is not its own reward, it is just a means to an end",
            "exclusion_group": 3
        },
        {
            "text": "Magic should not be shared. Hording it is the only path to power",
            "exclusion_group": 3
        },
        {
            "text": "There are many sources of magic, books and scrolls are the least reliable",
            "exclusion_group": 3
        },
        {
            "text": "Combat is a vital skill for all adventurers and no one should expect to be rescued by anyone.",
            "exclusion_group": 4
        },
        {
            "text": "There is nothing spiritual about magic. It only draws upon talent, determination and vast knowledge",
            "exclusion_group": 4
        },
        {
            "text": "The only causes worth fighting for is riches, power and loot",
            "exclusion_group": 4
        },
        {
            "text": "Faith is a detriment to self-discovery",
            "exclusion_group": 4
        },
        {
            "text": "There are no miracles, only great deeds caried out by great people",
            "exclusion_group": 4
        },
        {
            "text": "No piece of equipment is more important than a weapon",
            "exclusion_group": 5
        },
        {
            "text": "Magical energy is an external force, it cannot be harnessed from within",
            "exclusion_group": 5
        },
        {
            "text": "One must stay in touch with current events and the outside world to grow thrive",
            "exclusion_group": 5
        },
        {
            "text": "Possessing a vast collection of valuable items is the truest sign of power and success",
            "exclusion_group": 5
        },
        {
            "text": "Morality depends on the spirit of the law more than the letter of the law",
            "exclusion_group": 5
        },
        {
            "text": "No amount of conditioning can replace a good suit of armor",
            "exclusion_group": 6
        },
        {
            "text": "Blind fury is no substitute for a well thought out plan",
            "exclusion_group": 6
        },
        {
            "text": " Leadership is the province of wisdom it should never be earned through aggression.",
            "exclusion_group": 6
        },
        {
            "text": " Instincts can only get you so far, knowledge of magic is the most reliable survival skill",
            "exclusion_group": 6
        },
        {
            "text": "Classical training is the only way to learn combat, fighting like an animal will get you nowhere",
            "exclusion_group": 6
        },
        {
            "text": "Nothing is truly yours unless it obtained honorably. ",
            "exclusion_group": 7
        },
        {
            "text": "The city may seem like a good place to make a fortune but that is a lie. It is far wiser to live off the land",
            "exclusion_group": 7
        },
        {
            "text": "There is little honor in killing your enemies from behind",
            "exclusion_group": 7
        },
        {
            "text": " Rules are meant to be followed. The law is no place to split hairs.",
            "exclusion_group": 7
        },
        {
            "text": "Fortune favors the strong and powerful, subterfuge will only get you so far ",
            "exclusion_group": 7
        },
        {
            "text": "It is rarely wise to go off on your own, adventurers should stick together",
            "exclusion_group": 8
        },
        {
            "text": "Stalking your enemy is a good way to get trapped, you are much better off luring your enemy to you",
            "exclusion_group": 8
        },
        {
            "text": "Those who live in the wild have no obligation to protect city folk",
            "exclusion_group": 8
        },
        {
            "text": "One cannot live in the wild and maintain their hygiene",
            "exclusion_group": 8
        },
        {
            "text": "You never what kind of monster you are going to fight. It is foolish to specialize in fighting a particular one",
            "exclusion_group": 8
        },
        {
            "text": "Only a fool takes inspiration from song and story, point me to treasure and you have my loyalty",
            "exclusion_group": 9
        },
        {
            "text": "Tall tales are no substitute for the truth, no matter how inspiring they are.",
            "exclusion_group": 9
        },
        {
            "text": "You must slay your enemies. Why break their spirits when you can break their bones",
            "exclusion_group": 9
        },
        {
            "text": "There is a danger in knowing too many things, one must choose a trade and master it ",
            "exclusion_group": 9
        },
        {
            "text": "Magic is less of an art and more of a science.",
            "exclusion_group": 9
        },
        {
            "text": "One must summon their anger to succeed in battle, no amount of training can substitute for an emotional rampage.",
            "exclusion_group": 10
        },
        {
            "text": "There is such a thing as knowing how to use too many weapons. ",
            "exclusion_group": 10
        },
        {
            "text": "A problem that can only be solved with combat might not be worth solving",
            "exclusion_group": 10
        },
        {
            "text": "Success in combat is not an end unto itself",
            "exclusion_group": 10
        },
        {
            "text": "Winning battles should never be a matter of pride, they are just a means to an end.",
            "exclusion_group": 10
        },
        {
            "text": " Magic can be hobby, an occupation or a vocation it is all up to you",
            "exclusion_group": 11
        },
        {
            "text": "Diligent study and the support of guide is the key to master the art of magic.",
            "exclusion_group": 11
        },
        {
            "text": "There is a tranquil nature to magical energy",
            "exclusion_group": 11
        },
        {
            "text": "One does not become magically inclined by some spontaneous event. It happens over a lengthily period of time.",
            "exclusion_group": 11
        },
        {
            "text": "The power to wield magic is never a curse. It is a deliberate choice made by its wielder",
            "exclusion_group": 11
        },
        {
            "text": "One cannot aquire magical talents by making a deal",
            "exclusion_group": 12
        },
        {
            "text": "Magic attained from a higher power must come from a god",
            "exclusion_group": 12
        },
        {
            "text": "Wieilding power granted through an alliance is no substitute for indipendance",
            "exclusion_group": 12
        },
        {
            "text": "Those who wield magic need not dirty their hands with the brutality of combat",
            "exclusion_group": 12
        },
        {
            "text": "The wielders of magic have an obligation to share knowledge with the larger community",
            "exclusion_group": 12
        }
    ]
    return response.json(dict(types=types, questions=questions))
def process_results():
    data_to_process = request.vars['content']
    section_splitter = request.vars['section_splitter']
    item_splitter = request.vars['item_splitter']
    value_splitter = request.vars['value_splitter']
    sections = data_to_process.split(section_splitter)
    scores = sections[0].split(item_splitter)
    score_matrix = [{'value': s.split(value_splitter)[0], 'code': s.split(value_splitter)[1]} for s in scores]
    types = get_types()
    type_names = list(types.keys())
    # print([types[t] for t in type_names])
    # print([s['value'] for s in score_matrix])
    processed_scores = {n: 0 for n in type_names}
    for s in score_matrix:
        for t in type_names:
            if int(s['code']) == types[t]:
                processed_scores[t] = int(processed_scores[t]) + int(s['value'])
    sorted_values = [processed_scores[n] for n in type_names]
    sorted_values.sort()
    lowest_value = sorted_values[0]
    return response.json([n for n in type_names if processed_scores[n] == lowest_value])
    
def archive_data():
    data_to_save = request.vars['content']
    f = open(get_archive_path(request, request.vars['data_key']), "w")
    f.write(data_to_save)
    f.close()
    return response.json(dict(status='success'))