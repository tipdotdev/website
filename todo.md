# Tip.dev todo

## API

- [x] Change signup flow to not prefer any type (email + password, or oauth), so that no matter what type is signing up, it will all work the same
- [x] Set up google oauth handling
- [x] When a user signs up with any method, check if the email is already in the DB, if it is, tell them they have to use whatever method they have used already, and that they can link other methods in the dashboard. That way if user A signs up with google, then user B signs up with github and for some reason they have the same email, it wont give user B access to A's account. Also if user A just forgot that the first time they used google, we can tell them that we have their google account linked and to sign in they need to use that one then they can link others after that
- [ ] In the dashboard, also give the user the ability to unlink signin methods, all that will do is remove their oauth id from their oauth.<PLATFORM>.id in the db, next time they login with the revoked oauth, they will be told the stuff above this todo
- [x] Research if I should be using the access tokens provided by platforms for jwt or my own token. right now its our own token we generate after verifying the authenticity of the account.
- [ ] Maybe encrypt oauth state tokens before sending them back to the client and then decrypt them when recieved
- [ ] set a TTL on the redis oauth state keys so that they are only valid for like 15 mins or something 
- [ ] Maybe generate oauth urls server side? idk might be safer... needs research
- [ ] I dont think we care about refreshing any oauth tokens because the only data we get from whatever platform is only requested once when the user signs up, then if they want to change any data, it would be stored on our side, but research
- [ ] Maybe unify oauth callbacks server side so we know 100% that they are all handled the same way. further would be to unify all signups into one function with slight variations depending on what the user is signing up with
- [ ] when stripe account is being created, add apple pay domain auth
- [ ] track last logins, in the login or oauth callbacks by changing user.last_login value to now
- [ ] stop saving user objects to redis, just need it in mongo
- [ ] When a user tries to connect a new oauth to an existing account, check if the oauth is already connected to another account, if it is, tell them they cant do that, if it isnt, then connect it

## Website

- [x] ~~Maybe change it so if you continue with email then it asks you for a username a step 1 of the onboarding. this way we can do that for all signup types !!! i like this~~
- [ ] change account page on dashboard to have account stuff and move whats there rn to the profile page. like here we want to have password changes, email changes, linked account changes, account data such as acct id for support purposes, idk what else. also here is where username changes should be handled.
- [ ] profile page should have where you can change all public data that is seen on their profile such as avatar, banner, name, ummm socials, website, etc.
- [ ] stripe payout method in onboarding button should be disabled until a payout currency is selected
- [ ] finish pricing page
- [ ] finish landing page
- [ ] finish product pages
- [ ] finish contact us page
- [ ] finish about company page
- [ ] finish jobs page
- [ ] finish presskit page
- [ ] admin dashboard - user management, stats, comment management, payment management, error management, etc.
- [ ] for the admin dashboard i want to be able to handle data mixmatch errors. i.e. if 2 users somehow get the same username

## Docs

- [ ] docs should be the last thing i do before launch, that way it will all be accurate and i wont have to go back and change anything while developing. 
- [ ] 2 types of docs, API, and platform. The platform should be where we explain how to do stuff on the website and how shit works, whereas the api docs should be the technical shit in the future when we launch a public api

## Other

- [x] make an actual terms of service
- [x] make an actual privacy policy
- [x] make an actual cookie policy
- [x] make an actual content policy
- [ ] make an actual community guidelines policy
- [ ] push discord server harder
- [ ] i would love if tip.dev was open source