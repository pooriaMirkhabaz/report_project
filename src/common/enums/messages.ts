
export enum PublicMessage {
    CreatedResponse = "ذخیره با موفقیت انجام شد",
    OkResponse = "عملیات با موفقیت انجام شد.",
    Updated = "ویرایش با موفقیت انجام شد.",
    Deleted = "حذف با موفقیت انجام شد.",
    CompletedGoal = "هدف مورد نظر انجام شده است",

}

export enum NotFoundMessage {
    NotFoundDepartment = "دپارتمانی یافت نشد.",
    NotFoundIndicator = "شاخصی یافت نشد.",
    NotFoundGoal = "هدفی یافت نشد.",
    NotFoundGoalValue = "ایتم مورد نظر یافت نشد.",
    NotFoundIndicatorValue = "ایتم مورد نظر یافت نشد.",
}

export enum ConflictMessage {
    ExistDepartmentTitle = "دپارتمان وارد شده تکراری میباشد",
    ExistIndicatorTitle = "شاخص وارد شده تکراری میباشد",
    ExistGoalTitle = "هدف وارد شده تکراری میباشد",
}
