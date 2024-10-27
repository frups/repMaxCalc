const PORT = 8002;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/weight/:weightValue/reps/:noReps', (req, res) => {

    console.log(req.params);    
    const weightValue = parseInt(req.params.weightValue);
    const noReps = parseInt(req.params.noReps, 10);


    if(!weightValue|| !noReps || weightValue <= 0 || noReps <= 0 || !Number.isInteger(noReps) || !Number.isInteger(weightValue)) {
        res.status(400).send('Please provide proper weight and reps values');
        return;
    }

    const nscaChart = {
        1: 1.00,
        2: 0.95,
        3: 0.93,
        4: 0.90,
        5: 0.87,
        6: 0.85,
        7: 0.83,
        8: 0.80,
        9: 0.77,
        10: 0.75,
        11: 0.72,
        12: 0.70,
    };
    const maxRepWeight = weightValue*36/(37-noReps);

    for (const reps in nscaChart) {
        nscaChart[reps] *= maxRepWeight;
    }
    
    res.json({ maxRepWeight: maxRepWeight, repPercentages: nscaChart });
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );