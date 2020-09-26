import React, {useState} from 'react'
import styled from 'styled-components';

const BASIC_RECIPE = {
    wholeSpeltFlour: 153,
    whileBreadFlour: 68,
    sourdough: 190,
    water: 134,
    salt: 6
};
let totalWeightOfOneLoaf = 0;
Object.keys(BASIC_RECIPE).forEach(ingredient => {
    totalWeightOfOneLoaf += BASIC_RECIPE[ingredient];
});


function HamitziApp() {
    const [breadCount, setBreadCount] = useState(1);
    const [existingSourdough, setExistingSourDough] = useState(0);
    const [desiredHamitzi, setDesiredHamitzi] = useState(10);

    const renderFeedSourdoughInstructions = () => {
        if (existingSourdough - 10 > BASIC_RECIPE.sourdough * breadCount) {
            return (
                <Label>{`Yay! You have enough sourdough to make ${breadCount} bread loafs, and a spare Hamitzi`}</Label>
            );
        }

        const missingSourdoughAmount = ((BASIC_RECIPE.sourdough * breadCount) + desiredHamitzi) - existingSourdough;
        const feedingAmount = (missingSourdoughAmount / 2).toFixed(2);
        return (
            <>
                <Label>{`You are missing ${missingSourdoughAmount} g of sourdough.`}</Label>
                <Label>{`You need to feed your sourdough before you can make ${breadCount} bread loafs (and have a spare Hamitzi of ${desiredHamitzi} g).`}</Label>
                <br/>
                <Label>{`Please feed your sourdough with:`}</Label>
                <Label>{`${feedingAmount} g of water`}</Label>
                <Label>{`${feedingAmount} g of plain flour`}</Label>
                <Label>{`In order to have enough sourdough for both your bread and your remaining Hamitzi`}</Label>
            </>
        );
    };

    return (
        <Container>
            <div>Welcome to the great Hamitzi Calculator!</div>
            <br/>
            <FormLine>
                <Label>Desired number of bread loafs:</Label>
                <Input
                    type="number"
                    min="1"
                    value={breadCount}
                    onChange={event => setBreadCount(parseInt(event.target.value))}
                />
            </FormLine>
            <Label>{`(Total weight of loaf is: ${totalWeightOfOneLoaf} g)`}</Label>
            <br/>
            <Label>{`Whole Spelt flour: ${breadCount * BASIC_RECIPE.wholeSpeltFlour} g`}</Label>
            <Label>{`White bread flour: ${breadCount * BASIC_RECIPE.whileBreadFlour} g`}</Label>
            <Label>{`Sourdough: ${breadCount * BASIC_RECIPE.sourdough} g`}</Label>
            <Label>{`Water: ${breadCount * BASIC_RECIPE.water} g`}</Label>
            <Label>{`Salt: ${breadCount * BASIC_RECIPE.salt} g`}</Label>
            <br/>
            <FormLine>
                <Label>Existing sourdough in g:</Label>
                <Input
                    type="number"
                    value={existingSourdough}
                    onChange={event => setExistingSourDough(parseFloat(event.target.value))}
                    min={"1"}
                />
            </FormLine>
            <FormLine>
                <Label>Desired amount of spare sourdough (Hamitzi) in g:</Label>
                <Input
                    type="number"
                    value={desiredHamitzi}
                    onChange={(event) => {setDesiredHamitzi(parseFloat(event.target.value))}}
                    min={"0"}
                />
            </FormLine>
            <br/>
            {renderFeedSourdoughInstructions()}
        </Container>
    );
}

export default HamitziApp;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #61dafb;
    height: 100vh;
`;

const Select = styled.select`
  width: fit-content;
`;

const Input = styled.input`
  width: fit-content;
`;

const Label = styled.div`
  margin-right: 10px;
`;

const FormLine = styled.div`
  width: fit-content; 
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  background: aliceblue;
`;