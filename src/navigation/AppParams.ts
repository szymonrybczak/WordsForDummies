import List from '../models/List'
import LearnMethod from '../models/LearnMethod'
import QuizType from '../models/QuizType'

type AppParams = {
    WelcomeScreen: undefined
    ChooseLearnMethodScreen: undefined
    ChooseQuizTypeScreen: undefined
    ChooseListScreen: {
        learnMethod: LearnMethod
        quizType?: QuizType
    }
    QuizScreen: { list: List; quizType: QuizType }
    SuccessQuizScreen: { list: List }
    ExamScreen: { list: List }
    SuccessExamScreen: undefined
    ListsScreen: undefined
    AddListNameScreen: undefined
    AddWordsScreen: { list: List }
    MoreScreen: undefined
    SettingsScreen: undefined
    FeaturesScreen: undefined
    AboutScreen: undefined
    ForGeeksScreen: undefined
}

export default AppParams
