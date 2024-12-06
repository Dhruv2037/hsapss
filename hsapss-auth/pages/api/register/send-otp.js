import  Twilio  from "twilio";
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client =Twilio(accountSid,authToken);

export default async function handler(req,res){
    await dbConnect();
    if(req.method !== 'POST')
        return res.status(405).json({error:'Method Not Allowed'});

    const phone = req.body.phone;
   // const isLogin = req.body.isLogin;
    console.log(phone);
    if(!phone)
       return res.status(400).json({error:"Phone number is required"});
    try {
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        let user = await User.findOne({ phone });

        if (!user) {
          user = await User.create({ phone, otp, otpExpiresAt });
        }
        // else if(!isLogin && user.verified){
        //   return res.status(409).json({ success: true,message:'you are already registered' });
        //}
         else {
          user.otp = otp;
          user.otpExpiresAt = otpExpiresAt;
          await user.save();
        }
        // Send the OTP via Twilio
        const message = await client.messages.create({
          body: `Your verification code is ${otp}`,
          from: twilioPhone,
          to: phone,
        });
    
        console.log(`OTP sent: ${otp}`);
    

        return res.status(200).json({ success: true, messageSid: message.sid ,message:'OTP sent successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send OTP' });
      }
};