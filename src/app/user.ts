export class User {
    userID: number
    firstname:string
    lastname:string
    username:string
    password:string
    
}
export class ExamDefinition {
    examId:number
    name:string
    passingScore:number
    questions:ExamDefinitionDetails[]
}
export class ExamDefinitionDetails {
    qid:number
    questionText:string
    questionAnswer:string
    questionOptions:string
    examID:number
}
export class Response {
    userExamID:number
    questionID:number
    userResponse:string
    correct:boolean

}
export class UserExam {
    userExamID:number
    userID:number
    examID:number
    score:number
    grade:string
}
export class Error {
    response:string
}