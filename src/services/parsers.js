const TOPICS_COUNT = 18

export const parseDb = (pack) => {
    const data = pack.tours[0].questions.slice(0, TOPICS_COUNT)
    const dataTopics = data.map(d => d.question.split('\n ')[0])
    const dataQuestions = data.map(d => d.question.split('\n ').slice(1))
    const dataAnswers = data.map(d => d.answer.split('\n '))

    let questionsPackage = {
        rounds: [],
        finalRound: null
    };

    for (let i = 0; i < 3; ++i) {
        let round = {
            name: `Раунд ${i + 1}`,
            topics: []
        };

        for (let j = 0; j < 6; ++j) {
            let topic = {
                name: dataTopics[i * 6 + j],
                questions: []
            };

            for (let k = 0; k < 5; ++k) {
                let question = {
                    id: `${i+1}.${j+1}.${k+1}`,
                    question: dataQuestions[i * 6 + j][k],
                    answer: dataAnswers[i * 6 + j][k]
                }
                topic.questions.push(question);
            }

            round.topics.push(topic);
        }

        questionsPackage.rounds.push(round);
    }
    return questionsPackage;
}