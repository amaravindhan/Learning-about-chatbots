from chatterbot import ChatBot
# from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
# import logging

# logging.basicConfig(level=logging.INFO)

chatBot = ChatBot("Seeta", 
                storage_adapter='chatterbot.storage.SQLStorageAdapter',
                logic_adapters=[
                    'chatterbot.logic.BestMatch',
                    'chatterbot.logic.MathematicalEvaluation',
                    'chatterbot.logic.TimeLogicAdapter',
                ],
                database_uri='sqlite:///database.sqlite3'
            )

# trainer = ListTrainer(chatBot)

# trainer.train([
#     'How are you?',
#     'I am good.',
#     'That is good to hear.',
#     'Thank you',
#     'You are welcome.',
#     'What is your name?',
#     'Seetha'
# ])

trainer = ChatterBotCorpusTrainer(chatBot)

trainer.train("chatterbot.corpus.english")

while True:
    try:
        user_input = input('Myself : ')
        seeta_response = chatBot.get_response(user_input)
        print('Seetha : {}'.format(seeta_response))
    
    except(KeyboardInterrupt, EOFError, SystemExit):
        break

