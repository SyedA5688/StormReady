import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import questions from '../assets/prep_and_action_Qs.json';

export default function PrepActionQOTD()
{
  const [currentQ, setCurrentQ] = useState(1);
  const [rightAnsSelected, setRightAnsSelected] = useState(false);
  const [wrongAnsSelected, setWrongAnsSelected] = useState(false);

  const AHandler = () => {
    setRightAnsSelected(questions[currentQ].Answer == "A");
    setWrongAnsSelected(questions[currentQ].Answer != "A");
  }

  const BHandler = () => {
    setRightAnsSelected(questions[currentQ].Answer == "B");
    setWrongAnsSelected(questions[currentQ].Answer != "B");
  }
  
  const CHandler = () => {
    setRightAnsSelected(questions[currentQ].Answer == "C");
    setWrongAnsSelected(questions[currentQ].Answer != "C");
  }
  
  const DHandler = () => {
    setRightAnsSelected(questions[currentQ].Answer == "D");
    setWrongAnsSelected(questions[currentQ].Answer != "D");
  }
    
  const nextQuestionHandler = () => {
    const maxQs = 20; // Total number of questions about hurricanes available
    let newQNum = Math.ceil(Math.random() * maxQs);
    setCurrentQ(newQNum);
    setRightAnsSelected(false);
    setWrongAnsSelected(false);
  }

  let screenHeight = Dimensions.get('window').height;
  
  return(
    <View style={[styles.container, {height: screenHeight - 240}]} >
      <View style={styles.Qframe} >
        <Text style={styles.textQ} >Preparation Question {questions[currentQ].Q}: </Text>
      </View>

      {/* Answer container */}
      <View style={styles.answerContainer} >
        <TouchableOpacity style={styles.AnswerCard} onPress={AHandler} >
          <Text style={styles.textA} >A: {questions[currentQ].A} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerCard} onPress={BHandler} >
          <Text style={styles.textA} >B: {questions[currentQ].B} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerCard} onPress={CHandler} >
          <Text style={styles.textA} >C: {questions[currentQ].C} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswerCard} onPress={DHandler} >
          <Text style={styles.textA} >D: {questions[currentQ].D} </Text>
        </TouchableOpacity>
        <Text style={styles.selectText} >Select Any Answer</Text>
      </View>
      
      {/* Feedback container */}
      <View>
        {rightAnsSelected? 
          <View>
            <View style={{flexDirection: 'row'}} >
              <Image source={require('../assets/checkmark.png')} style={styles.image} />
              <Text style={styles.imageText} >Correct!</Text>
            </View>
            <Text style={styles.feedbackText} >{questions[currentQ].CorrectFeedback}</Text>
          </View> : <></>}
        {wrongAnsSelected? 
          <View>
            <View style={{flexDirection: 'row'}} >
              <Image source={require('../assets/x.png')} style={styles.image} />
              <Text style={styles.imageText} >Incorrect</Text>
            </View>
            <Text style={styles.feedbackText} >{questions[currentQ].IncorrectFeedback}</Text>
          </View> : <></> }
      </View>

      {/* Next Question button at bottom of page */}
      <TouchableOpacity style={styles.newQButtonContainer} onPress={nextQuestionHandler} >
        <Text style={styles.buttonText} >Next Question</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    //height: '100%', // Height set in line based on screen height
    //borderWidth: 1,
  },
  Qframe: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#bbb',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'antiquewhite',
  },
  textQ: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 30,
  },
  AnswerCard: {
    width: '100%',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    backgroundColor: 'aliceblue',
  },
  textA: {
    fontSize: 16,
  },
  selectText: {
    alignSelf: 'center',
    marginTop: 5,
  },
  image: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
  },
  imageText: {
    fontSize: 24,
    alignSelf: 'center',
    marginLeft: 15,
  },
  feedbackText: {
    fontSize: 20,
    marginTop: 10,
  },
  newQButtonContainer: {
    marginTop: 'auto',
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
})