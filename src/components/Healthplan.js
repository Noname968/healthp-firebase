import React, { useState } from 'react';
import './Healthplan.css';
import Navbar from './Navbar';

const Healthplan = () => {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [healthPlans, setHealthPlans] = useState([]);
    let bmiRange = '';

    const generateHealthPlans = () => {
        const bmi = calculateBMI(weight, height);
        const requiredCalories = calculateRequiredCalories(age, weight, height, gender, activityLevel);
        const weightRecommendation = generateWeightRecommendation(bmi);
        const foodIntakeRecommendation = generateFoodIntakeRecommendation(requiredCalories);

        const plans = [];

        // BMI and weight recommendation
        if (bmi < 18.5) {
            plans.push('Your BMI is below the normal range. You may need to focus on gaining weight.');
            plans.push(weightRecommendation);
        } else if (bmi >= 18.5 && bmi < 25) {
            plans.push('Your BMI is within the normal range. Maintain a balanced diet and exercise regularly.');
            plans.push(weightRecommendation);
        } else {
            plans.push('Your BMI is above the normal range. You may need to focus on losing weight.');
            plans.push(weightRecommendation);
        }

        // Food intake recommendation
        plans.push(foodIntakeRecommendation);

        setHealthPlans(plans);
    };

    const calculateBMI = (weight, height) => {
        const heightInMeters = heightUnit === 'cm' ? height / 100 : height / 3.281; // Convert height to meters if cm, or to feet if feet
        return weight / (heightInMeters * heightInMeters);
    };

    const calculateRequiredCalories = (age, weight, height, gender, activityLevel) => {
        let bmr = 0;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'female') {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        switch (activityLevel) {
            case 'sedentary':
                return bmr * 1.2;
            case 'lightlyActive':
                return bmr * 1.375;
            case 'moderatelyActive':
                return bmr * 1.55;
            case 'veryActive':
                return bmr * 1.725;
            case 'extraActive':
                return bmr * 1.9;
            default:
                return bmr;
        }
    };

    const generateWeightRecommendation = (bmi) => {
        if (bmi < 18.5) {
            return `Your BMI is ${bmi.toFixed(1)}, which is below the normal range. It is recommended to gradually gain weight. Focus on consuming nutrient-rich foods and consult a healthcare professional or dietitian for personalized advice.`;
        } else if (bmi >= 18.5 && bmi < 25) {
            return `Your BMI is ${bmi.toFixed(1)}, which is within the normal range. Maintain a balanced diet and regular physical activity to support a healthy weight. Aim to consume a variety of nutrient-dense foods for overall well-being.`;
        } else if (bmi >= 25 && bmi < 30) {
            return `Your BMI is ${bmi.toFixed(1)}, which is in the overweight range. It is recommended to gradually reduce weight through a combination of healthy eating and regular exercise. Consult a healthcare professional or dietitian for personalized guidance.`;
        } else {
            return `Your BMI is ${bmi.toFixed(1)}, which is in the obese range. It is important to focus on weight loss to reduce the risk of various health conditions. Seek guidance from a healthcare professional or dietitian for a tailored weight loss plan.`;
        }
    };

    const generateFoodIntakeRecommendation = (requiredCalories) => {
        let recommendation = '';
        let foodOptions = '';

        if (requiredCalories < 1500) {
            recommendation = 'Ensure you consume enough food to meet your daily calorie needs.';
            foodOptions = 'Consider incorporating nutrient-dense foods such as whole grains, lean proteins, fruits, vegetables, and healthy fats into your meals.';
        } else if (requiredCalories >= 1500 && requiredCalories < 2500) {
            recommendation = 'Maintain a balanced diet to support your energy needs.';
            foodOptions = 'Include a variety of food groups in your meals, including whole grains, lean proteins, fruits, vegetables, and healthy fats.';
        } else {
            recommendation = 'Consider reducing your food intake to support weight loss.';
            foodOptions = 'Focus on portion control and choose nutrient-dense foods that are lower in calories. Incorporate more vegetables, lean proteins, whole grains, and limit processed and sugary foods.';
        }

        return [recommendation, foodOptions];
    };

    if (gender === 'male') {
        bmiRange = '20.7 - 26.4'; // BMI range for males
    } else if (gender === 'female') {
        bmiRange = '19.1 - 25.8'; // BMI range for females
    } else {
        bmiRange = '18.5 - 24.9'; // Default BMI range
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="left-container">
                    <div className="health-plan-generator">
                        <h2 className="heading">Health Plan Generator</h2>
                        <div className="form-group">
                            <label className="label">Age:</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
                        </div>
                        <div className="form-group">
                            <label className="label">Weight (kg):</label>
                            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input" />
                        </div>
                        <div className="form-group">
                            <label className="label">Height:</label>
                            <div style={{ display: 'flex' }}>
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input" style={{ marginRight: '10px',width:'170%' }} />
                                <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} className="select">
                                    <option value="cm">cm</option>
                                    <option value="feet">feet</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Gender:</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="select">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label">Activity Level:</label>
                            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="select">
                                <option value="">Select Activity Level</option>
                                <option value="sedentary">Sedentary (little to no exercise)</option>
                                <option value="lightlyActive">Lightly Active (light exercise/sports 1-3 days/week)</option>
                                <option value="moderatelyActive">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                                <option value="veryActive">Very Active (hard exercise/sports 6-7 days a week)</option>
                                <option value="extraActive">Extra Active (very hard exercise/sports & physical job)</option>
                            </select>
                        </div>
                        <button onClick={generateHealthPlans} className="button" disabled={!age || !weight || !height || !gender || !activityLevel}>
                            Generate Plan
                        </button>
                    </div>
                </div>
                <div className="right-container">
                    {healthPlans.length > 0 ? (
                        <div className="plan-container">
                            <h2 className="sub-heading">Generated Health Plans:</h2>
                            <p className="bmi-range">BMI Range for {gender} is {bmiRange}</p>
                            <ul className="plan-list">
                                {healthPlans.map((plan, index) => (
                                    <li key={index} className="plan-item">{plan}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No health plans generated. Please fill in the form and click "Generate Plan".</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Healthplan;
