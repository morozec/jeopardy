import {ROUNDS_COUNT, ROUND_TOPICS_COUNT, TOPIC_QUESTIONS_COUNT} from './constants'

export const parseDb = (pack) => {
    const data = pack.tours[0].questions.slice(0, ROUNDS_COUNT * ROUND_TOPICS_COUNT)
    const dataTopics = data.map(d => d.question.split('\n ')[0])
    const dataQuestions = data.map(d => d.question.split('\n ').slice(1))
    const dataAnswers = data.map(d => d.answer.split('\n '))

    let questionsPackage = {
        rounds: [],
        finalRound: null
    };

    for (let i = 0; i < ROUNDS_COUNT; ++i) {
        let round = {
            name: `Раунд ${i + 1}`,
            topics: []
        };

        for (let j = 0; j < ROUND_TOPICS_COUNT; ++j) {
            let topic = {
                name: dataTopics[i * ROUND_TOPICS_COUNT + j],
                questions: []
            };

            for (let k = 0; k < TOPIC_QUESTIONS_COUNT; ++k) {
                let question = {
                    id: `${i+1}.${j+1}.${k+1}`,
                    question: dataQuestions[i * ROUND_TOPICS_COUNT + j][k],
                    answer: dataAnswers[i * ROUND_TOPICS_COUNT + j][k]
                }
                topic.questions.push(question);
            }

            round.topics.push(topic);
        }

        questionsPackage.rounds.push(round);
    }
    return questionsPackage;
}