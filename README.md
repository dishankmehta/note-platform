#Note-Platform

A Note Platform, which lets users to create, edit and share notes across the platform
Recommends notes on favorite topics and supports collaborative notes which can be shared 
with other people on platform.

1 - private
2 - public
3 - group


DELETE end point :
Method name: delete_note()
Params: 
    - note_id
    - user_id: username of the user
    
    
GET_CHEATSHEETS end point: 
Method name: get_cheatsheets()
Params: 
   - user_id: username of the user


GET_PUBLIC_NOTES end point: 
Method name: get_public_notes()
Params: 
   - user_id: username of the user


GET_PRIVATE_NOTES end point: 
Method name: get_private_notes()
Params: 
   - user_id: username of the user

EDIT_NOTE end point:
Method name: edit_note()
Params:
 - note_id
 - title 
 - note_type 
 - note_body
 - upvotes 
 - downvotes 
 - views 
 - tags 
 - color 



