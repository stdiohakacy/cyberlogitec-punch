const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

async function sendPunchRequest() {
    try {
        const response = await axios({
            method: 'post',
            url: process.env.CYBER_URL,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
                'Connection': 'keep-alive',
                'DNT': '1',
                'Host': 'blueprint.cyberlogitec.com.vn',
                'Referer': 'https://blueprint.cyberlogitec.com.vn/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'Cookie': process.env.CYBER_COOKIE 
            }
        });

        console.log('Punch request sent:', response.data);
    } catch (error) {
        console.error('Error sending punch request:', error.message);
    }
}

function getRandomTime(hourStart, hourEnd) {
    const now = new Date();
    const randomHour = Math.floor(Math.random() * (hourEnd - hourStart + 1)) + hourStart;
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), randomHour, randomMinute, randomSecond);

    if (scheduledTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    return scheduledTime;
}

function schedulePunchJobs() {
    const morningTime = getRandomTime(0, 7);
    const eveningTime = getRandomTime(18, 23);
    
    const morningDelay = morningTime - new Date();
    const eveningDelay = eveningTime - new Date();

    console.log(`Scheduled morning punch at: ${morningTime}`);
    console.log(`Scheduled evening punch at: ${eveningTime}`);

    setTimeout(() => {
        sendPunchRequest();
        schedulePunchJobs(); // Reschedule for the next day
    }, morningDelay);

    setTimeout(() => {
        sendPunchRequest();
        schedulePunchJobs(); // Reschedule for the next day
    }, eveningDelay);
}

// Start scheduling jobs
schedulePunchJobs();

app.post('/punch', async (req, res) => {
    try {
        await sendPunchRequest();
        res.status(200).json({ message: 'Punch request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Request Error', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
