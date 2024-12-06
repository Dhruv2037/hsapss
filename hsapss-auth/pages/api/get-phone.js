import {parse} from 'cookie';

export default function handler(req,res){
    const cookies = req.headers.cookie;

    if(!cookies)
        return res.status(401).json({error:"no session found"});

    const parsedCookies = parse(cookies);
    const userSession = parsedCookies.userSession;
    if (!userSession) {
        return res.status(401).json({ error: 'Session not found or invalid.' });
      }

      try {
        const session = JSON.parse(userSession); // Parse the stored JSON cookie
        res.status(200).json({ phone: session.phone });
      } catch (error) {
        res.status(400).json({ error: 'Invalid session data.' });
      }
}