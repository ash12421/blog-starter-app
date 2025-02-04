---
title: "Solve Me!"
excerpt: "A raw, unfiltered rant in poetic form"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Viktor
  picture: ""
ogImage:
  url: "/assets/blog/preview/cover.jpg"
priv: false
---


https://limewire.com/d/6e5f186e-dfe1-4189-95fd-fd9259d603da#8sMVJxsJdAnSIeZZtyCs_7tmrIBS-EQPDwoSF9vJb5c


Lemme add the code that I used to encrypt it. Surely, nobody will be able to decrypt the above text…


`def encrypt(text):
    primes = get_first_n_primes(len(text))
    shift = len(text)
    rotated_primes = primes[shift:] + primes[:shift]
    encrypted = [chr((ord(c)<<2) ^ rotated_primes[i]) for i, c in enumerate(text)]
    return "".join(encrypted)`