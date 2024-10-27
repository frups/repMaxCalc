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
    //const maxRepWeight = weightValue*(1+noReps/30);
    const maxRepWeight = weightValue*(Math.pow(noReps, 0.1));
    //const maxRepWeight = weightValue * (0.9849 + 0.0328*noReps);
    //const maxRepWeight = weightValue * (1/(0.488 + 0.538*Math.pow(Math.E,(-0.055*noReps))));
    //const maxRepWeight = weightValue * (0.988+0.0104*noReps+0.00190*noReps*noReps-0.0000584*noReps*noReps*noReps);
    //const maxRepWeight = weightValue * (1/(1.013-Math.pow(0.0267123, noReps)));
    //const maxRepWeight = weightValue*(1/(0.522+0.419*Math.pow(Math.E, -0.055*noReps)));

    for (const reps in nscaChart) {
        nscaChart[reps] *= maxRepWeight;
    }
    
    res.json({ maxRepWeight: maxRepWeight, repPercentages: nscaChart });
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );