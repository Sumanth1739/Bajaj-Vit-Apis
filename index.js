const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const FULL_NAME = "Singamreddy Sumanth Reddy";
const DOB = "11102004"; 
const EMAIL = "sumanthreddysingamreddy11@gmail.com";
const ROLL_NUMBER = "22BKT0075";


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];

        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let allAlphabets = "";

        data.forEach(item => {
            if (/^\d+$/.test(item)) {
                const num = parseInt(item);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                allAlphabets += item;
            } else {
                special_characters.push(item);
            }
        });

        
        let reversed = allAlphabets.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversed.length; i++) {
            concat_string += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
        }

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});


app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
