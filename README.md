
Meta Messenger App Micro Clone 

Description:-  This Application lets one , two or more users to chat in group. Users need to login using google account in order to join chat in group.


Step to run application 

Step 1  => Take pull of source code using git command 
         
           git clone https://github.com/Amar9691/meta-app.git


Step 2 => Install all required packages using command 

          npm install 


step 3 => setup google project on google console and create oauth client credentials and take your client id and client secret 

          SETUP in your environment file (.env) with following key

          NEXT_PUBLIC_GOOGLE_ID = 
          NEXT_PUBLIC_GOOGLE_SECRET=


step 4 => Create account and app on pusher to get crentials and update pusher.ts file 

         
          export const serverPusher = new Pusher({
            appId: "",
            key: "",
            secret: "",
            cluster: "ap2",
            useTLS: true,
          });

          export const clientPusher = new ClientPusher("key", {
            cluster: "ap2",
          });


step 5 => For manage your data in cloud environment we have used https://upstash.com/ redis serverless data

          So you need to create account and setup configuration and add url in .env file using following key 

          NEXT_PUBLIC_REDIS_URL=

step 6 => add vercel url variable in env file using following key

         VERCEL_URL=

step 7 => finally run application using 

           npm run dev or yarn dev


Enjoy......











   
            



  


           
