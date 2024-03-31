import requests


def get_answer_from_vectara(question):
    url = "https://api.vectara.io:443/v1/query"  # Replace this with the actual Vectara API endpoint
    headers = {
        "Content-Type": "application/json",
        "customer-id": "697029971",
        "x-api-key": "zqt_KYvVUxiNWxPywl1APwAlxaZnpIdNC1TqVcVbkg",
    }
    data = {
        "query": [
            {
                "query": question
                + " Your first sentence must contain the exact answer",
                "queryContext": "",
                "start": 0,
                "numResults": 10,
                "contextConfig": {
                    "charsBefore": 0,
                    "charsAfter": 0,
                    "sentencesBefore": 1,
                    "sentencesAfter": 1,
                    "startTag": "",
                    "endTag": "",
                },
                "corpusKey": [
                    {
                        "customerId": 697029971,
                        "corpusId": 2,
                        "semantics": 0,
                        "metadataFilter": "",
                        "lexicalInterpolationConfig": {"lambda": 0.025},
                        "dim": [],
                    }
                ],
                "summary": [
                    {
                        "debug": False,
                        "chat": {"store": True, "conversationId": ""},
                        "maxSummarizedResults": 5,
                        "responseLang": "eng",
                        "summarizerPromptName": "vectara-summary-ext-v1.2.0",
                        "isFactualConsistencyScoreEnabled": True,
                    }
                ],
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            answer = response.json()["responseSet"][0]["response"][0]["text"]
            # print(response.content)
            return answer
        else:
            return "I got confused, sorry. Maybe you can rephrase your question?"
    except Exception as e:
        return "Sorry, I lost connection with my brains..."
