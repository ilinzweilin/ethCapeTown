
# Faïrspöt 

<p align="center">
<img width="450" height="450" src="https://github.com/charleenfei/images/blob/master/logo.png">
</p>

## Why?

Buying airtime is expensive (and expires!). 
Subscription access to roaming internet forces you to choose between privacy, convenience and access. The ability to get quick access to data when you really need it to check for directions or call a taxi just doesn't exist. Because some people just want to help create a better world based on sharing what they have. Because other people could be helped significantly by an additional source of income, based off a WiFi network they already have at home.

We believe all these reasons matter, and that access to internet should be a right for everyone.

## How?

We incentivise the creation of an internet sharing infrastructure (inspired by the Freifunk project) via micropayments over the Raiden Network, and offer a token flow which actually generates utility.

## Future Thoughts: a Spötti on every corner!

We've already mapped out several evolutionary steps in the future lifecycle of FaïrSpöt.

- Mobile-first approach (pending a Raiden lite-node).
- Ability to charge and pay what you want for sharing and accessing internet, on a scale and filter basis.
- Multi-account possibility with integrated key management
- Integration on the router level

## Our Approach: Successes Celebrated and Challenges Faced

Successes Celebrated: Many, and the most important one -- we have turned in a project that we feel represents an engaged and fully committed 48 hour effort.

Challenges: It's the classic story of working with bleeding edge technology, though we are happy to say that no blood was spilt in the course of the last two days. 

In this vein, however, we did have a few challenges:

Small but still stressful:

- It was the first time for either one of us to touch either Grid or the Raiden API.

Epic and extremely stressful:

- We discovered quite late into the Hackathon that the current config for Raiden nodes necessitate a 500 block settlement time after closing a channel before it is possible to open a new one. This, along with other transport layer problems, led to quite some friction in the development process.
- Our Electron application necessitated a manual compilation of native dependencies for TCP/IP package sniffing.
- We attempted to utilise Grid to develop our application, which did not work out of the box. There were many issues to fix which were handled directly by Philip from the Grid team: a peer dependency in Raiden on Geth was missing; lack of handlers for interactive messages (from Raiden); conflicting flags between Raiden and Geth; lack of support for native module dependencies.
