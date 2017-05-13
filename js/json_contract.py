#!/usr/bin/python
import requests
import json
'''
:python3
:JSON RPC
'''

def get_client_version(url, headers):
    payload = {
        'jsonrpc': '2.0',
        'method': 'web3_clientVersion',
        'params': [],
        'id': 1
    }
    result = requests.post(url, data=json.dumps(payload), headers=headers)
    clientVersion = json.loads(result.text)['result']
    return clientVersion

def eth_call(url, headers):
    payload = {
        'jsonrpc': '2.0',
        'method': 'eth_call',
        'params': [{
#             "from":"0x004ec07d2329997267Ec62b4166639513386F32E",
            "to": "0xafbA601690B87C0f2f5296af4860A4E56d32F3C9",
            "data": "0x7aa66e11000000000000000000000000000000000000000000000000000000000000007b"
        }],
        'id': 1
    }
    result = requests.post(url, data=json.dumps(payload), headers=headers)
    get_org = json.loads(result.text)
    print (get_org['result'])
    print (type(get_org['result']))
    return get_org['result']

def eth_sendTransaction(url, headers):
    payload = {
        'jsonrpc': '2.0',
        'method': 'eth_sendTransaction',
        'params': [{
             "from": "0x004ec07d2329997267Ec62b4166639513386F32E",
             "to": "0xafbA601690B87C0f2f5296af4860A4E56d32F3C9",
             "gas": "0x76c0",
             "gasPrice": "0x9184e72a000",
             "value": "0x9184e72a",
             "data": "0x4b549c7a00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000020"
        }],
        'id': 1
    }
    result = requests.post(url, data=json.dumps(payload), headers=headers)
    upload_org = json.loads(result.text)
    print (upload_org)
    print (type(upload_org['result']))
    return upload_org['result']

if __name__ == '__main__':
    url = 'http://192.168.1.107:8540'
    headers = {"Content-Type": "application/json"}
#    print (get_client_version(url, headers))
    eth_call(url, headers)
    eth_sendTransaction(url, headers)
