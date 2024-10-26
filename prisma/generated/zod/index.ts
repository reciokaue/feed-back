import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password']);

export const FormScalarFieldEnumSchema = z.enum(['id','name','about','active','logoUrl','isPublic','createdAt','userId']);

export const QuestionScalarFieldEnumSchema = z.enum(['id','text','index','required','typeId','formId']);

export const OptionScalarFieldEnumSchema = z.enum(['id','text','index','questionId']);

export const QuestionTypeScalarFieldEnumSchema = z.enum(['id','name','label','icon']);

export const SessionScalarFieldEnumSchema = z.enum(['id','createdAt','formId']);

export const ResponseScalarFieldEnumSchema = z.enum(['id','text','createdAt','sessionId','questionId','optionId']);

export const TopicScalarFieldEnumSchema = z.enum(['id','name']);

export const FormTopicScalarFieldEnumSchema = z.enum(['formId','topicId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// FORM SCHEMA
/////////////////////////////////////////

export const FormSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  about: z.string().nullable(),
  active: z.boolean(),
  logoUrl: z.string().nullable(),
  isPublic: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.number().int(),
})

export type Form = z.infer<typeof FormSchema>

/////////////////////////////////////////
// QUESTION SCHEMA
/////////////////////////////////////////

export const QuestionSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean(),
  typeId: z.number().int().nullable(),
  formId: z.number().int(),
})

export type Question = z.infer<typeof QuestionSchema>

/////////////////////////////////////////
// OPTION SCHEMA
/////////////////////////////////////////

export const OptionSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  index: z.number().int(),
  questionId: z.number().int(),
})

export type Option = z.infer<typeof OptionSchema>

/////////////////////////////////////////
// QUESTION TYPE SCHEMA
/////////////////////////////////////////

export const QuestionTypeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  label: z.string(),
  icon: z.string(),
})

export type QuestionType = z.infer<typeof QuestionTypeSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  formId: z.number().int(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// RESPONSE SCHEMA
/////////////////////////////////////////

export const ResponseSchema = z.object({
  id: z.number().int(),
  text: z.string(),
  createdAt: z.coerce.date(),
  sessionId: z.number().int(),
  questionId: z.number().int(),
  optionId: z.number().int(),
})

export type Response = z.infer<typeof ResponseSchema>

/////////////////////////////////////////
// TOPIC SCHEMA
/////////////////////////////////////////

export const TopicSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Topic = z.infer<typeof TopicSchema>

/////////////////////////////////////////
// FORM TOPIC SCHEMA
/////////////////////////////////////////

export const FormTopicSchema = z.object({
  formId: z.number().int(),
  topicId: z.number().int(),
})

export type FormTopic = z.infer<typeof FormTopicSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  forms: z.union([z.boolean(),z.lazy(() => FormFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  forms: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  forms: z.union([z.boolean(),z.lazy(() => FormFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FORM
//------------------------------------------------------

export const FormIncludeSchema: z.ZodType<Prisma.FormInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  questions: z.union([z.boolean(),z.lazy(() => QuestionFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  formTopics: z.union([z.boolean(),z.lazy(() => FormTopicFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FormCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FormArgsSchema: z.ZodType<Prisma.FormDefaultArgs> = z.object({
  select: z.lazy(() => FormSelectSchema).optional(),
  include: z.lazy(() => FormIncludeSchema).optional(),
}).strict();

export const FormCountOutputTypeArgsSchema: z.ZodType<Prisma.FormCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FormCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FormCountOutputTypeSelectSchema: z.ZodType<Prisma.FormCountOutputTypeSelect> = z.object({
  questions: z.boolean().optional(),
  sessions: z.boolean().optional(),
  formTopics: z.boolean().optional(),
}).strict();

export const FormSelectSchema: z.ZodType<Prisma.FormSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  about: z.boolean().optional(),
  active: z.boolean().optional(),
  logoUrl: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  questions: z.union([z.boolean(),z.lazy(() => QuestionFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  formTopics: z.union([z.boolean(),z.lazy(() => FormTopicFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FormCountOutputTypeArgsSchema)]).optional(),
}).strict()

// QUESTION
//------------------------------------------------------

export const QuestionIncludeSchema: z.ZodType<Prisma.QuestionInclude> = z.object({
  questionType: z.union([z.boolean(),z.lazy(() => QuestionTypeArgsSchema)]).optional(),
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
  options: z.union([z.boolean(),z.lazy(() => OptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const QuestionArgsSchema: z.ZodType<Prisma.QuestionDefaultArgs> = z.object({
  select: z.lazy(() => QuestionSelectSchema).optional(),
  include: z.lazy(() => QuestionIncludeSchema).optional(),
}).strict();

export const QuestionCountOutputTypeArgsSchema: z.ZodType<Prisma.QuestionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => QuestionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const QuestionCountOutputTypeSelectSchema: z.ZodType<Prisma.QuestionCountOutputTypeSelect> = z.object({
  options: z.boolean().optional(),
}).strict();

export const QuestionSelectSchema: z.ZodType<Prisma.QuestionSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  index: z.boolean().optional(),
  required: z.boolean().optional(),
  typeId: z.boolean().optional(),
  formId: z.boolean().optional(),
  questionType: z.union([z.boolean(),z.lazy(() => QuestionTypeArgsSchema)]).optional(),
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
  options: z.union([z.boolean(),z.lazy(() => OptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// OPTION
//------------------------------------------------------

export const OptionIncludeSchema: z.ZodType<Prisma.OptionInclude> = z.object({
  question: z.union([z.boolean(),z.lazy(() => QuestionArgsSchema)]).optional(),
  Response: z.union([z.boolean(),z.lazy(() => ResponseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OptionArgsSchema: z.ZodType<Prisma.OptionDefaultArgs> = z.object({
  select: z.lazy(() => OptionSelectSchema).optional(),
  include: z.lazy(() => OptionIncludeSchema).optional(),
}).strict();

export const OptionCountOutputTypeArgsSchema: z.ZodType<Prisma.OptionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OptionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OptionCountOutputTypeSelectSchema: z.ZodType<Prisma.OptionCountOutputTypeSelect> = z.object({
  Response: z.boolean().optional(),
}).strict();

export const OptionSelectSchema: z.ZodType<Prisma.OptionSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  index: z.boolean().optional(),
  questionId: z.boolean().optional(),
  question: z.union([z.boolean(),z.lazy(() => QuestionArgsSchema)]).optional(),
  Response: z.union([z.boolean(),z.lazy(() => ResponseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// QUESTION TYPE
//------------------------------------------------------

export const QuestionTypeIncludeSchema: z.ZodType<Prisma.QuestionTypeInclude> = z.object({
  questions: z.union([z.boolean(),z.lazy(() => QuestionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuestionTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const QuestionTypeArgsSchema: z.ZodType<Prisma.QuestionTypeDefaultArgs> = z.object({
  select: z.lazy(() => QuestionTypeSelectSchema).optional(),
  include: z.lazy(() => QuestionTypeIncludeSchema).optional(),
}).strict();

export const QuestionTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.QuestionTypeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => QuestionTypeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const QuestionTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.QuestionTypeCountOutputTypeSelect> = z.object({
  questions: z.boolean().optional(),
}).strict();

export const QuestionTypeSelectSchema: z.ZodType<Prisma.QuestionTypeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  label: z.boolean().optional(),
  icon: z.boolean().optional(),
  questions: z.union([z.boolean(),z.lazy(() => QuestionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuestionTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
  responses: z.union([z.boolean(),z.lazy(() => ResponseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionCountOutputTypeArgsSchema: z.ZodType<Prisma.SessionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SessionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SessionCountOutputTypeSelectSchema: z.ZodType<Prisma.SessionCountOutputTypeSelect> = z.object({
  responses: z.boolean().optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  formId: z.boolean().optional(),
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
  responses: z.union([z.boolean(),z.lazy(() => ResponseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESPONSE
//------------------------------------------------------

export const ResponseIncludeSchema: z.ZodType<Prisma.ResponseInclude> = z.object({
  session: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  option: z.union([z.boolean(),z.lazy(() => OptionArgsSchema)]).optional(),
}).strict()

export const ResponseArgsSchema: z.ZodType<Prisma.ResponseDefaultArgs> = z.object({
  select: z.lazy(() => ResponseSelectSchema).optional(),
  include: z.lazy(() => ResponseIncludeSchema).optional(),
}).strict();

export const ResponseSelectSchema: z.ZodType<Prisma.ResponseSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  sessionId: z.boolean().optional(),
  questionId: z.boolean().optional(),
  optionId: z.boolean().optional(),
  session: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  option: z.union([z.boolean(),z.lazy(() => OptionArgsSchema)]).optional(),
}).strict()

// TOPIC
//------------------------------------------------------

export const TopicIncludeSchema: z.ZodType<Prisma.TopicInclude> = z.object({
  formTopics: z.union([z.boolean(),z.lazy(() => FormTopicFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TopicCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TopicArgsSchema: z.ZodType<Prisma.TopicDefaultArgs> = z.object({
  select: z.lazy(() => TopicSelectSchema).optional(),
  include: z.lazy(() => TopicIncludeSchema).optional(),
}).strict();

export const TopicCountOutputTypeArgsSchema: z.ZodType<Prisma.TopicCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TopicCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TopicCountOutputTypeSelectSchema: z.ZodType<Prisma.TopicCountOutputTypeSelect> = z.object({
  formTopics: z.boolean().optional(),
}).strict();

export const TopicSelectSchema: z.ZodType<Prisma.TopicSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  formTopics: z.union([z.boolean(),z.lazy(() => FormTopicFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TopicCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FORM TOPIC
//------------------------------------------------------

export const FormTopicIncludeSchema: z.ZodType<Prisma.FormTopicInclude> = z.object({
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
  topic: z.union([z.boolean(),z.lazy(() => TopicArgsSchema)]).optional(),
}).strict()

export const FormTopicArgsSchema: z.ZodType<Prisma.FormTopicDefaultArgs> = z.object({
  select: z.lazy(() => FormTopicSelectSchema).optional(),
  include: z.lazy(() => FormTopicIncludeSchema).optional(),
}).strict();

export const FormTopicSelectSchema: z.ZodType<Prisma.FormTopicSelect> = z.object({
  formId: z.boolean().optional(),
  topicId: z.boolean().optional(),
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
  topic: z.union([z.boolean(),z.lazy(() => TopicArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  forms: z.lazy(() => FormListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  forms: z.lazy(() => FormOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  forms: z.lazy(() => FormListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FormWhereInputSchema: z.ZodType<Prisma.FormWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  logoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  formTopics: z.lazy(() => FormTopicListRelationFilterSchema).optional()
}).strict();

export const FormOrderByWithRelationInputSchema: z.ZodType<Prisma.FormOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  logoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  questions: z.lazy(() => QuestionOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FormWhereUniqueInputSchema: z.ZodType<Prisma.FormWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  logoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  formTopics: z.lazy(() => FormTopicListRelationFilterSchema).optional()
}).strict());

export const FormOrderByWithAggregationInputSchema: z.ZodType<Prisma.FormOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  logoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FormCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FormAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FormMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FormMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FormSumOrderByAggregateInputSchema).optional()
}).strict();

export const FormScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FormScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FormScalarWhereWithAggregatesInputSchema),z.lazy(() => FormScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormScalarWhereWithAggregatesInputSchema),z.lazy(() => FormScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  logoUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const QuestionWhereInputSchema: z.ZodType<Prisma.QuestionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionWhereInputSchema),z.lazy(() => QuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionWhereInputSchema),z.lazy(() => QuestionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  typeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  questionType: z.union([ z.lazy(() => QuestionTypeNullableRelationFilterSchema),z.lazy(() => QuestionTypeWhereInputSchema) ]).optional().nullable(),
  form: z.union([ z.lazy(() => FormRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
  options: z.lazy(() => OptionListRelationFilterSchema).optional()
}).strict();

export const QuestionOrderByWithRelationInputSchema: z.ZodType<Prisma.QuestionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  questionType: z.lazy(() => QuestionTypeOrderByWithRelationInputSchema).optional(),
  form: z.lazy(() => FormOrderByWithRelationInputSchema).optional(),
  options: z.lazy(() => OptionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const QuestionWhereUniqueInputSchema: z.ZodType<Prisma.QuestionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => QuestionWhereInputSchema),z.lazy(() => QuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionWhereInputSchema),z.lazy(() => QuestionWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  typeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  questionType: z.union([ z.lazy(() => QuestionTypeNullableRelationFilterSchema),z.lazy(() => QuestionTypeWhereInputSchema) ]).optional().nullable(),
  form: z.union([ z.lazy(() => FormRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
  options: z.lazy(() => OptionListRelationFilterSchema).optional()
}).strict());

export const QuestionOrderByWithAggregationInputSchema: z.ZodType<Prisma.QuestionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QuestionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QuestionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QuestionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QuestionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QuestionSumOrderByAggregateInputSchema).optional()
}).strict();

export const QuestionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QuestionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => QuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => QuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  required: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  typeId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  formId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const OptionWhereInputSchema: z.ZodType<Prisma.OptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OptionWhereInputSchema),z.lazy(() => OptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OptionWhereInputSchema),z.lazy(() => OptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  questionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  question: z.union([ z.lazy(() => QuestionRelationFilterSchema),z.lazy(() => QuestionWhereInputSchema) ]).optional(),
  Response: z.lazy(() => ResponseListRelationFilterSchema).optional()
}).strict();

export const OptionOrderByWithRelationInputSchema: z.ZodType<Prisma.OptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => QuestionOrderByWithRelationInputSchema).optional(),
  Response: z.lazy(() => ResponseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OptionWhereUniqueInputSchema: z.ZodType<Prisma.OptionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => OptionWhereInputSchema),z.lazy(() => OptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OptionWhereInputSchema),z.lazy(() => OptionWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  questionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  question: z.union([ z.lazy(() => QuestionRelationFilterSchema),z.lazy(() => QuestionWhereInputSchema) ]).optional(),
  Response: z.lazy(() => ResponseListRelationFilterSchema).optional()
}).strict());

export const OptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.OptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OptionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => OptionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OptionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => OptionSumOrderByAggregateInputSchema).optional()
}).strict();

export const OptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OptionScalarWhereWithAggregatesInputSchema),z.lazy(() => OptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OptionScalarWhereWithAggregatesInputSchema),z.lazy(() => OptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  questionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const QuestionTypeWhereInputSchema: z.ZodType<Prisma.QuestionTypeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionTypeWhereInputSchema),z.lazy(() => QuestionTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionTypeWhereInputSchema),z.lazy(() => QuestionTypeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questions: z.lazy(() => QuestionListRelationFilterSchema).optional()
}).strict();

export const QuestionTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.QuestionTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  questions: z.lazy(() => QuestionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const QuestionTypeWhereUniqueInputSchema: z.ZodType<Prisma.QuestionTypeWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => QuestionTypeWhereInputSchema),z.lazy(() => QuestionTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionTypeWhereInputSchema),z.lazy(() => QuestionTypeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questions: z.lazy(() => QuestionListRelationFilterSchema).optional()
}).strict());

export const QuestionTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.QuestionTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QuestionTypeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QuestionTypeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QuestionTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QuestionTypeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QuestionTypeSumOrderByAggregateInputSchema).optional()
}).strict();

export const QuestionTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QuestionTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => QuestionTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => QuestionTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  form: z.union([ z.lazy(() => FormRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
  responses: z.lazy(() => ResponseListRelationFilterSchema).optional()
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  form: z.lazy(() => FormOrderByWithRelationInputSchema).optional(),
  responses: z.lazy(() => ResponseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  form: z.union([ z.lazy(() => FormRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
  responses: z.lazy(() => ResponseListRelationFilterSchema).optional()
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  formId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ResponseWhereInputSchema: z.ZodType<Prisma.ResponseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResponseWhereInputSchema),z.lazy(() => ResponseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponseWhereInputSchema),z.lazy(() => ResponseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  questionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  optionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  session: z.union([ z.lazy(() => SessionRelationFilterSchema),z.lazy(() => SessionWhereInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => OptionRelationFilterSchema),z.lazy(() => OptionWhereInputSchema) ]).optional(),
}).strict();

export const ResponseOrderByWithRelationInputSchema: z.ZodType<Prisma.ResponseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional(),
  session: z.lazy(() => SessionOrderByWithRelationInputSchema).optional(),
  option: z.lazy(() => OptionOrderByWithRelationInputSchema).optional()
}).strict();

export const ResponseWhereUniqueInputSchema: z.ZodType<Prisma.ResponseWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ResponseWhereInputSchema),z.lazy(() => ResponseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponseWhereInputSchema),z.lazy(() => ResponseWhereInputSchema).array() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  questionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  optionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  session: z.union([ z.lazy(() => SessionRelationFilterSchema),z.lazy(() => SessionWhereInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => OptionRelationFilterSchema),z.lazy(() => OptionWhereInputSchema) ]).optional(),
}).strict());

export const ResponseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResponseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ResponseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ResponseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResponseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResponseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ResponseSumOrderByAggregateInputSchema).optional()
}).strict();

export const ResponseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResponseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ResponseScalarWhereWithAggregatesInputSchema),z.lazy(() => ResponseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponseScalarWhereWithAggregatesInputSchema),z.lazy(() => ResponseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  questionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  optionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TopicWhereInputSchema: z.ZodType<Prisma.TopicWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  formTopics: z.lazy(() => FormTopicListRelationFilterSchema).optional()
}).strict();

export const TopicOrderByWithRelationInputSchema: z.ZodType<Prisma.TopicOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  formTopics: z.lazy(() => FormTopicOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TopicWhereUniqueInputSchema: z.ZodType<Prisma.TopicWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicWhereInputSchema),z.lazy(() => TopicWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  formTopics: z.lazy(() => FormTopicListRelationFilterSchema).optional()
}).strict());

export const TopicOrderByWithAggregationInputSchema: z.ZodType<Prisma.TopicOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TopicCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TopicAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TopicMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TopicMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TopicSumOrderByAggregateInputSchema).optional()
}).strict();

export const TopicScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TopicScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TopicScalarWhereWithAggregatesInputSchema),z.lazy(() => TopicScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TopicScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TopicScalarWhereWithAggregatesInputSchema),z.lazy(() => TopicScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FormTopicWhereInputSchema: z.ZodType<Prisma.FormTopicWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormTopicWhereInputSchema),z.lazy(() => FormTopicWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormTopicWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormTopicWhereInputSchema),z.lazy(() => FormTopicWhereInputSchema).array() ]).optional(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  topicId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  form: z.union([ z.lazy(() => FormRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
  topic: z.union([ z.lazy(() => TopicRelationFilterSchema),z.lazy(() => TopicWhereInputSchema) ]).optional(),
}).strict();

export const FormTopicOrderByWithRelationInputSchema: z.ZodType<Prisma.FormTopicOrderByWithRelationInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  form: z.lazy(() => FormOrderByWithRelationInputSchema).optional(),
  topic: z.lazy(() => TopicOrderByWithRelationInputSchema).optional()
}).strict();

export const FormTopicWhereUniqueInputSchema: z.ZodType<Prisma.FormTopicWhereUniqueInput> = z.object({
  formId_topicId: z.lazy(() => FormTopicFormIdTopicIdCompoundUniqueInputSchema)
})
.and(z.object({
  formId_topicId: z.lazy(() => FormTopicFormIdTopicIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => FormTopicWhereInputSchema),z.lazy(() => FormTopicWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormTopicWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormTopicWhereInputSchema),z.lazy(() => FormTopicWhereInputSchema).array() ]).optional(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  topicId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  form: z.union([ z.lazy(() => FormRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
  topic: z.union([ z.lazy(() => TopicRelationFilterSchema),z.lazy(() => TopicWhereInputSchema) ]).optional(),
}).strict());

export const FormTopicOrderByWithAggregationInputSchema: z.ZodType<Prisma.FormTopicOrderByWithAggregationInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FormTopicCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FormTopicAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FormTopicMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FormTopicMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FormTopicSumOrderByAggregateInputSchema).optional()
}).strict();

export const FormTopicScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FormTopicScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FormTopicScalarWhereWithAggregatesInputSchema),z.lazy(() => FormTopicScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormTopicScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormTopicScalarWhereWithAggregatesInputSchema),z.lazy(() => FormTopicScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  formId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  topicId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  forms: z.lazy(() => FormCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  forms: z.lazy(() => FormUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  forms: z.lazy(() => FormUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  forms: z.lazy(() => FormUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormCreateInputSchema: z.ZodType<Prisma.FormCreateInput> = z.object({
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFormsInputSchema),
  questions: z.lazy(() => QuestionCreateNestedManyWithoutFormInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateInputSchema: z.ZodType<Prisma.FormUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.number().int(),
  questions: z.lazy(() => QuestionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUpdateInputSchema: z.ZodType<Prisma.FormUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFormsNestedInputSchema).optional(),
  questions: z.lazy(() => QuestionUpdateManyWithoutFormNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateInputSchema: z.ZodType<Prisma.FormUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormCreateManyInputSchema: z.ZodType<Prisma.FormCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.number().int()
}).strict();

export const FormUpdateManyMutationInputSchema: z.ZodType<Prisma.FormUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FormUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionCreateInputSchema: z.ZodType<Prisma.QuestionCreateInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  questionType: z.lazy(() => QuestionTypeCreateNestedOneWithoutQuestionsInputSchema).optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutQuestionsInputSchema),
  options: z.lazy(() => OptionCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const QuestionUncheckedCreateInputSchema: z.ZodType<Prisma.QuestionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  typeId: z.number().int().optional().nullable(),
  formId: z.number().int(),
  options: z.lazy(() => OptionUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const QuestionUpdateInputSchema: z.ZodType<Prisma.QuestionUpdateInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  questionType: z.lazy(() => QuestionTypeUpdateOneWithoutQuestionsNestedInputSchema).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional(),
  options: z.lazy(() => OptionUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const QuestionUncheckedUpdateInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  typeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.lazy(() => OptionUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const QuestionCreateManyInputSchema: z.ZodType<Prisma.QuestionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  typeId: z.number().int().optional().nullable(),
  formId: z.number().int()
}).strict();

export const QuestionUpdateManyMutationInputSchema: z.ZodType<Prisma.QuestionUpdateManyMutationInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  typeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OptionCreateInputSchema: z.ZodType<Prisma.OptionCreateInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  question: z.lazy(() => QuestionCreateNestedOneWithoutOptionsInputSchema),
  Response: z.lazy(() => ResponseCreateNestedManyWithoutOptionInputSchema).optional()
}).strict();

export const OptionUncheckedCreateInputSchema: z.ZodType<Prisma.OptionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  questionId: z.number().int(),
  Response: z.lazy(() => ResponseUncheckedCreateNestedManyWithoutOptionInputSchema).optional()
}).strict();

export const OptionUpdateInputSchema: z.ZodType<Prisma.OptionUpdateInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => QuestionUpdateOneRequiredWithoutOptionsNestedInputSchema).optional(),
  Response: z.lazy(() => ResponseUpdateManyWithoutOptionNestedInputSchema).optional()
}).strict();

export const OptionUncheckedUpdateInputSchema: z.ZodType<Prisma.OptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Response: z.lazy(() => ResponseUncheckedUpdateManyWithoutOptionNestedInputSchema).optional()
}).strict();

export const OptionCreateManyInputSchema: z.ZodType<Prisma.OptionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  questionId: z.number().int()
}).strict();

export const OptionUpdateManyMutationInputSchema: z.ZodType<Prisma.OptionUpdateManyMutationInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionTypeCreateInputSchema: z.ZodType<Prisma.QuestionTypeCreateInput> = z.object({
  name: z.string(),
  label: z.string(),
  icon: z.string(),
  questions: z.lazy(() => QuestionCreateNestedManyWithoutQuestionTypeInputSchema).optional()
}).strict();

export const QuestionTypeUncheckedCreateInputSchema: z.ZodType<Prisma.QuestionTypeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  label: z.string(),
  icon: z.string(),
  questions: z.lazy(() => QuestionUncheckedCreateNestedManyWithoutQuestionTypeInputSchema).optional()
}).strict();

export const QuestionTypeUpdateInputSchema: z.ZodType<Prisma.QuestionTypeUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUpdateManyWithoutQuestionTypeNestedInputSchema).optional()
}).strict();

export const QuestionTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.QuestionTypeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUncheckedUpdateManyWithoutQuestionTypeNestedInputSchema).optional()
}).strict();

export const QuestionTypeCreateManyInputSchema: z.ZodType<Prisma.QuestionTypeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  label: z.string(),
  icon: z.string()
}).strict();

export const QuestionTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.QuestionTypeUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QuestionTypeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutSessionsInputSchema),
  responses: z.lazy(() => ResponseCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  formId: z.number().int(),
  responses: z.lazy(() => ResponseUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
  responses: z.lazy(() => ResponseUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  responses: z.lazy(() => ResponseUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  formId: z.number().int()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseCreateInputSchema: z.ZodType<Prisma.ResponseCreateInput> = z.object({
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  questionId: z.number().int(),
  session: z.lazy(() => SessionCreateNestedOneWithoutResponsesInputSchema),
  option: z.lazy(() => OptionCreateNestedOneWithoutResponseInputSchema)
}).strict();

export const ResponseUncheckedCreateInputSchema: z.ZodType<Prisma.ResponseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  sessionId: z.number().int(),
  questionId: z.number().int(),
  optionId: z.number().int()
}).strict();

export const ResponseUpdateInputSchema: z.ZodType<Prisma.ResponseUpdateInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  session: z.lazy(() => SessionUpdateOneRequiredWithoutResponsesNestedInputSchema).optional(),
  option: z.lazy(() => OptionUpdateOneRequiredWithoutResponseNestedInputSchema).optional()
}).strict();

export const ResponseUncheckedUpdateInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  optionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseCreateManyInputSchema: z.ZodType<Prisma.ResponseCreateManyInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  sessionId: z.number().int(),
  questionId: z.number().int(),
  optionId: z.number().int()
}).strict();

export const ResponseUpdateManyMutationInputSchema: z.ZodType<Prisma.ResponseUpdateManyMutationInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  optionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TopicCreateInputSchema: z.ZodType<Prisma.TopicCreateInput> = z.object({
  name: z.string(),
  formTopics: z.lazy(() => FormTopicCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicUncheckedCreateInputSchema: z.ZodType<Prisma.TopicUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  formTopics: z.lazy(() => FormTopicUncheckedCreateNestedManyWithoutTopicInputSchema).optional()
}).strict();

export const TopicUpdateInputSchema: z.ZodType<Prisma.TopicUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formTopics: z.lazy(() => FormTopicUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const TopicUncheckedUpdateInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedUpdateManyWithoutTopicNestedInputSchema).optional()
}).strict();

export const TopicCreateManyInputSchema: z.ZodType<Prisma.TopicCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const TopicUpdateManyMutationInputSchema: z.ZodType<Prisma.TopicUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TopicUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicCreateInputSchema: z.ZodType<Prisma.FormTopicCreateInput> = z.object({
  form: z.lazy(() => FormCreateNestedOneWithoutFormTopicsInputSchema),
  topic: z.lazy(() => TopicCreateNestedOneWithoutFormTopicsInputSchema)
}).strict();

export const FormTopicUncheckedCreateInputSchema: z.ZodType<Prisma.FormTopicUncheckedCreateInput> = z.object({
  formId: z.number().int(),
  topicId: z.number().int()
}).strict();

export const FormTopicUpdateInputSchema: z.ZodType<Prisma.FormTopicUpdateInput> = z.object({
  form: z.lazy(() => FormUpdateOneRequiredWithoutFormTopicsNestedInputSchema).optional(),
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutFormTopicsNestedInputSchema).optional()
}).strict();

export const FormTopicUncheckedUpdateInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateInput> = z.object({
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicCreateManyInputSchema: z.ZodType<Prisma.FormTopicCreateManyInput> = z.object({
  formId: z.number().int(),
  topicId: z.number().int()
}).strict();

export const FormTopicUpdateManyMutationInputSchema: z.ZodType<Prisma.FormTopicUpdateManyMutationInput> = z.object({
}).strict();

export const FormTopicUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateManyInput> = z.object({
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  topicId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const FormListRelationFilterSchema: z.ZodType<Prisma.FormListRelationFilter> = z.object({
  every: z.lazy(() => FormWhereInputSchema).optional(),
  some: z.lazy(() => FormWhereInputSchema).optional(),
  none: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FormOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const QuestionListRelationFilterSchema: z.ZodType<Prisma.QuestionListRelationFilter> = z.object({
  every: z.lazy(() => QuestionWhereInputSchema).optional(),
  some: z.lazy(() => QuestionWhereInputSchema).optional(),
  none: z.lazy(() => QuestionWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const FormTopicListRelationFilterSchema: z.ZodType<Prisma.FormTopicListRelationFilter> = z.object({
  every: z.lazy(() => FormTopicWhereInputSchema).optional(),
  some: z.lazy(() => FormTopicWhereInputSchema).optional(),
  none: z.lazy(() => FormTopicWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const QuestionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QuestionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormTopicOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FormTopicOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormCountOrderByAggregateInputSchema: z.ZodType<Prisma.FormCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  logoUrl: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FormAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FormMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  logoUrl: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormMinOrderByAggregateInputSchema: z.ZodType<Prisma.FormMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  logoUrl: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormSumOrderByAggregateInputSchema: z.ZodType<Prisma.FormSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const QuestionTypeNullableRelationFilterSchema: z.ZodType<Prisma.QuestionTypeNullableRelationFilter> = z.object({
  is: z.lazy(() => QuestionTypeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => QuestionTypeWhereInputSchema).optional().nullable()
}).strict();

export const FormRelationFilterSchema: z.ZodType<Prisma.FormRelationFilter> = z.object({
  is: z.lazy(() => FormWhereInputSchema).optional(),
  isNot: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const OptionListRelationFilterSchema: z.ZodType<Prisma.OptionListRelationFilter> = z.object({
  every: z.lazy(() => OptionWhereInputSchema).optional(),
  some: z.lazy(() => OptionWhereInputSchema).optional(),
  none: z.lazy(() => OptionWhereInputSchema).optional()
}).strict();

export const OptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionCountOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionMinOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionSumOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  typeId: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const QuestionRelationFilterSchema: z.ZodType<Prisma.QuestionRelationFilter> = z.object({
  is: z.lazy(() => QuestionWhereInputSchema).optional(),
  isNot: z.lazy(() => QuestionWhereInputSchema).optional()
}).strict();

export const ResponseListRelationFilterSchema: z.ZodType<Prisma.ResponseListRelationFilter> = z.object({
  every: z.lazy(() => ResponseWhereInputSchema).optional(),
  some: z.lazy(() => ResponseWhereInputSchema).optional(),
  none: z.lazy(() => ResponseWhereInputSchema).optional()
}).strict();

export const ResponseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ResponseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.OptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OptionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.OptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.OptionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionTypeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionTypeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionTypeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionTypeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionTypeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionTypeSumOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionTypeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionRelationFilterSchema: z.ZodType<Prisma.SessionRelationFilter> = z.object({
  is: z.lazy(() => SessionWhereInputSchema).optional(),
  isNot: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const OptionRelationFilterSchema: z.ZodType<Prisma.OptionRelationFilter> = z.object({
  is: z.lazy(() => OptionWhereInputSchema).optional(),
  isNot: z.lazy(() => OptionWhereInputSchema).optional()
}).strict();

export const ResponseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResponseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResponseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ResponseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResponseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResponseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResponseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResponseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResponseSumOrderByAggregateInputSchema: z.ZodType<Prisma.ResponseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  optionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicCountOrderByAggregateInputSchema: z.ZodType<Prisma.TopicCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TopicAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TopicMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicMinOrderByAggregateInputSchema: z.ZodType<Prisma.TopicMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicSumOrderByAggregateInputSchema: z.ZodType<Prisma.TopicSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TopicRelationFilterSchema: z.ZodType<Prisma.TopicRelationFilter> = z.object({
  is: z.lazy(() => TopicWhereInputSchema).optional(),
  isNot: z.lazy(() => TopicWhereInputSchema).optional()
}).strict();

export const FormTopicFormIdTopicIdCompoundUniqueInputSchema: z.ZodType<Prisma.FormTopicFormIdTopicIdCompoundUniqueInput> = z.object({
  formId: z.number(),
  topicId: z.number()
}).strict();

export const FormTopicCountOrderByAggregateInputSchema: z.ZodType<Prisma.FormTopicCountOrderByAggregateInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormTopicAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FormTopicAvgOrderByAggregateInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormTopicMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FormTopicMaxOrderByAggregateInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormTopicMinOrderByAggregateInputSchema: z.ZodType<Prisma.FormTopicMinOrderByAggregateInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormTopicSumOrderByAggregateInputSchema: z.ZodType<Prisma.FormTopicSumOrderByAggregateInput> = z.object({
  formId: z.lazy(() => SortOrderSchema).optional(),
  topicId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FormCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const FormUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FormUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FormUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FormUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFormsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFormsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFormsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFormsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const QuestionCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.QuestionCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutFormInputSchema),z.lazy(() => QuestionCreateWithoutFormInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutFormInputSchema),z.lazy(() => SessionCreateWithoutFormInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema),z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormTopicCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.FormTopicCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutFormInputSchema),z.lazy(() => FormTopicCreateWithoutFormInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuestionUncheckedCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.QuestionUncheckedCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutFormInputSchema),z.lazy(() => QuestionCreateWithoutFormInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutFormInputSchema),z.lazy(() => SessionCreateWithoutFormInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema),z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormTopicUncheckedCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUncheckedCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutFormInputSchema),z.lazy(() => FormTopicCreateWithoutFormInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutFormsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFormsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFormsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFormsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFormsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFormsInputSchema),z.lazy(() => UserUpdateWithoutFormsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormsInputSchema) ]).optional(),
}).strict();

export const QuestionUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.QuestionUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutFormInputSchema),z.lazy(() => QuestionCreateWithoutFormInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuestionUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => QuestionUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuestionUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => QuestionUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuestionUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => QuestionUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuestionScalarWhereInputSchema),z.lazy(() => QuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutFormInputSchema),z.lazy(() => SessionCreateWithoutFormInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema),z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormTopicUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.FormTopicUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutFormInputSchema),z.lazy(() => FormTopicCreateWithoutFormInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormTopicUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => FormTopicUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormTopicScalarWhereInputSchema),z.lazy(() => FormTopicScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuestionUncheckedUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutFormInputSchema),z.lazy(() => QuestionCreateWithoutFormInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuestionUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => QuestionUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuestionUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => QuestionUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuestionUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => QuestionUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuestionScalarWhereInputSchema),z.lazy(() => QuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutFormInputSchema),z.lazy(() => SessionCreateWithoutFormInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema),z.lazy(() => SessionCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormTopicUncheckedUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutFormInputSchema),z.lazy(() => FormTopicCreateWithoutFormInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormTopicUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => FormTopicUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormTopicScalarWhereInputSchema),z.lazy(() => FormTopicScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuestionTypeCreateNestedOneWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeCreateNestedOneWithoutQuestionsInput> = z.object({
  create: z.union([ z.lazy(() => QuestionTypeCreateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuestionTypeCreateOrConnectWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => QuestionTypeWhereUniqueInputSchema).optional()
}).strict();

export const FormCreateNestedOneWithoutQuestionsInputSchema: z.ZodType<Prisma.FormCreateNestedOneWithoutQuestionsInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional()
}).strict();

export const OptionCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.OptionCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => OptionCreateWithoutQuestionInputSchema),z.lazy(() => OptionCreateWithoutQuestionInputSchema).array(),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OptionCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OptionUncheckedCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUncheckedCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => OptionCreateWithoutQuestionInputSchema),z.lazy(() => OptionCreateWithoutQuestionInputSchema).array(),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OptionCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuestionTypeUpdateOneWithoutQuestionsNestedInputSchema: z.ZodType<Prisma.QuestionTypeUpdateOneWithoutQuestionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionTypeCreateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuestionTypeCreateOrConnectWithoutQuestionsInputSchema).optional(),
  upsert: z.lazy(() => QuestionTypeUpsertWithoutQuestionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => QuestionTypeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => QuestionTypeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => QuestionTypeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuestionTypeUpdateToOneWithWhereWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUpdateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedUpdateWithoutQuestionsInputSchema) ]).optional(),
}).strict();

export const FormUpdateOneRequiredWithoutQuestionsNestedInputSchema: z.ZodType<Prisma.FormUpdateOneRequiredWithoutQuestionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutQuestionsInputSchema).optional(),
  upsert: z.lazy(() => FormUpsertWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FormUpdateToOneWithWhereWithoutQuestionsInputSchema),z.lazy(() => FormUpdateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutQuestionsInputSchema) ]).optional(),
}).strict();

export const OptionUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.OptionUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => OptionCreateWithoutQuestionInputSchema),z.lazy(() => OptionCreateWithoutQuestionInputSchema).array(),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OptionUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => OptionUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OptionCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OptionUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => OptionUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OptionUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => OptionUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OptionScalarWhereInputSchema),z.lazy(() => OptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const OptionUncheckedUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.OptionUncheckedUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => OptionCreateWithoutQuestionInputSchema),z.lazy(() => OptionCreateWithoutQuestionInputSchema).array(),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => OptionCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OptionUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => OptionUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OptionCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OptionWhereUniqueInputSchema),z.lazy(() => OptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OptionUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => OptionUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OptionUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => OptionUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OptionScalarWhereInputSchema),z.lazy(() => OptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuestionCreateNestedOneWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionCreateNestedOneWithoutOptionsInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuestionCreateOrConnectWithoutOptionsInputSchema).optional(),
  connect: z.lazy(() => QuestionWhereUniqueInputSchema).optional()
}).strict();

export const ResponseCreateNestedManyWithoutOptionInputSchema: z.ZodType<Prisma.ResponseCreateNestedManyWithoutOptionInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutOptionInputSchema),z.lazy(() => ResponseCreateWithoutOptionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManyOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ResponseUncheckedCreateNestedManyWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUncheckedCreateNestedManyWithoutOptionInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutOptionInputSchema),z.lazy(() => ResponseCreateWithoutOptionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManyOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuestionUpdateOneRequiredWithoutOptionsNestedInputSchema: z.ZodType<Prisma.QuestionUpdateOneRequiredWithoutOptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuestionCreateOrConnectWithoutOptionsInputSchema).optional(),
  upsert: z.lazy(() => QuestionUpsertWithoutOptionsInputSchema).optional(),
  connect: z.lazy(() => QuestionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuestionUpdateToOneWithWhereWithoutOptionsInputSchema),z.lazy(() => QuestionUpdateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutOptionsInputSchema) ]).optional(),
}).strict();

export const ResponseUpdateManyWithoutOptionNestedInputSchema: z.ZodType<Prisma.ResponseUpdateManyWithoutOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutOptionInputSchema),z.lazy(() => ResponseCreateWithoutOptionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResponseUpsertWithWhereUniqueWithoutOptionInputSchema),z.lazy(() => ResponseUpsertWithWhereUniqueWithoutOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManyOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResponseUpdateWithWhereUniqueWithoutOptionInputSchema),z.lazy(() => ResponseUpdateWithWhereUniqueWithoutOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResponseUpdateManyWithWhereWithoutOptionInputSchema),z.lazy(() => ResponseUpdateManyWithWhereWithoutOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResponseScalarWhereInputSchema),z.lazy(() => ResponseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ResponseUncheckedUpdateManyWithoutOptionNestedInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateManyWithoutOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutOptionInputSchema),z.lazy(() => ResponseCreateWithoutOptionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResponseUpsertWithWhereUniqueWithoutOptionInputSchema),z.lazy(() => ResponseUpsertWithWhereUniqueWithoutOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManyOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResponseUpdateWithWhereUniqueWithoutOptionInputSchema),z.lazy(() => ResponseUpdateWithWhereUniqueWithoutOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResponseUpdateManyWithWhereWithoutOptionInputSchema),z.lazy(() => ResponseUpdateManyWithWhereWithoutOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResponseScalarWhereInputSchema),z.lazy(() => ResponseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuestionCreateNestedManyWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionCreateNestedManyWithoutQuestionTypeInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyQuestionTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuestionUncheckedCreateNestedManyWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUncheckedCreateNestedManyWithoutQuestionTypeInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyQuestionTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuestionUpdateManyWithoutQuestionTypeNestedInputSchema: z.ZodType<Prisma.QuestionUpdateManyWithoutQuestionTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuestionUpsertWithWhereUniqueWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUpsertWithWhereUniqueWithoutQuestionTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyQuestionTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuestionUpdateWithWhereUniqueWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUpdateWithWhereUniqueWithoutQuestionTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuestionUpdateManyWithWhereWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUpdateManyWithWhereWithoutQuestionTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuestionScalarWhereInputSchema),z.lazy(() => QuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuestionUncheckedUpdateManyWithoutQuestionTypeNestedInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateManyWithoutQuestionTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema).array(),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema),z.lazy(() => QuestionCreateOrConnectWithoutQuestionTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuestionUpsertWithWhereUniqueWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUpsertWithWhereUniqueWithoutQuestionTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuestionCreateManyQuestionTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuestionWhereUniqueInputSchema),z.lazy(() => QuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuestionUpdateWithWhereUniqueWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUpdateWithWhereUniqueWithoutQuestionTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuestionUpdateManyWithWhereWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUpdateManyWithWhereWithoutQuestionTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuestionScalarWhereInputSchema),z.lazy(() => QuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.FormCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional()
}).strict();

export const ResponseCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.ResponseCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutSessionInputSchema),z.lazy(() => ResponseCreateWithoutSessionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ResponseUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUncheckedCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutSessionInputSchema),z.lazy(() => ResponseCreateWithoutSessionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.FormUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => FormUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FormUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => FormUpdateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const ResponseUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.ResponseUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutSessionInputSchema),z.lazy(() => ResponseCreateWithoutSessionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResponseUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => ResponseUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResponseUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => ResponseUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResponseUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => ResponseUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResponseScalarWhereInputSchema),z.lazy(() => ResponseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ResponseUncheckedUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResponseCreateWithoutSessionInputSchema),z.lazy(() => ResponseCreateWithoutSessionInputSchema).array(),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema),z.lazy(() => ResponseCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResponseUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => ResponseUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResponseCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResponseWhereUniqueInputSchema),z.lazy(() => ResponseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResponseUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => ResponseUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResponseUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => ResponseUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResponseScalarWhereInputSchema),z.lazy(() => ResponseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedOneWithoutResponsesInputSchema: z.ZodType<Prisma.SessionCreateNestedOneWithoutResponsesInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutResponsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SessionCreateOrConnectWithoutResponsesInputSchema).optional(),
  connect: z.lazy(() => SessionWhereUniqueInputSchema).optional()
}).strict();

export const OptionCreateNestedOneWithoutResponseInputSchema: z.ZodType<Prisma.OptionCreateNestedOneWithoutResponseInput> = z.object({
  create: z.union([ z.lazy(() => OptionCreateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedCreateWithoutResponseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OptionCreateOrConnectWithoutResponseInputSchema).optional(),
  connect: z.lazy(() => OptionWhereUniqueInputSchema).optional()
}).strict();

export const SessionUpdateOneRequiredWithoutResponsesNestedInputSchema: z.ZodType<Prisma.SessionUpdateOneRequiredWithoutResponsesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutResponsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SessionCreateOrConnectWithoutResponsesInputSchema).optional(),
  upsert: z.lazy(() => SessionUpsertWithoutResponsesInputSchema).optional(),
  connect: z.lazy(() => SessionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SessionUpdateToOneWithWhereWithoutResponsesInputSchema),z.lazy(() => SessionUpdateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutResponsesInputSchema) ]).optional(),
}).strict();

export const OptionUpdateOneRequiredWithoutResponseNestedInputSchema: z.ZodType<Prisma.OptionUpdateOneRequiredWithoutResponseNestedInput> = z.object({
  create: z.union([ z.lazy(() => OptionCreateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedCreateWithoutResponseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OptionCreateOrConnectWithoutResponseInputSchema).optional(),
  upsert: z.lazy(() => OptionUpsertWithoutResponseInputSchema).optional(),
  connect: z.lazy(() => OptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OptionUpdateToOneWithWhereWithoutResponseInputSchema),z.lazy(() => OptionUpdateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedUpdateWithoutResponseInputSchema) ]).optional(),
}).strict();

export const FormTopicCreateNestedManyWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicCreateNestedManyWithoutTopicInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutTopicInputSchema),z.lazy(() => FormTopicCreateWithoutTopicInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyTopicInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormTopicUncheckedCreateNestedManyWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUncheckedCreateNestedManyWithoutTopicInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutTopicInputSchema),z.lazy(() => FormTopicCreateWithoutTopicInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyTopicInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormTopicUpdateManyWithoutTopicNestedInputSchema: z.ZodType<Prisma.FormTopicUpdateManyWithoutTopicNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutTopicInputSchema),z.lazy(() => FormTopicCreateWithoutTopicInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyTopicInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormTopicUpdateManyWithWhereWithoutTopicInputSchema),z.lazy(() => FormTopicUpdateManyWithWhereWithoutTopicInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormTopicScalarWhereInputSchema),z.lazy(() => FormTopicScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormTopicUncheckedUpdateManyWithoutTopicNestedInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateManyWithoutTopicNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormTopicCreateWithoutTopicInputSchema),z.lazy(() => FormTopicCreateWithoutTopicInputSchema).array(),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema),z.lazy(() => FormTopicCreateOrConnectWithoutTopicInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => FormTopicUpsertWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormTopicCreateManyTopicInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormTopicWhereUniqueInputSchema),z.lazy(() => FormTopicWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutTopicInputSchema),z.lazy(() => FormTopicUpdateWithWhereUniqueWithoutTopicInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormTopicUpdateManyWithWhereWithoutTopicInputSchema),z.lazy(() => FormTopicUpdateManyWithWhereWithoutTopicInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormTopicScalarWhereInputSchema),z.lazy(() => FormTopicScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormCreateNestedOneWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormCreateNestedOneWithoutFormTopicsInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormTopicsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutFormTopicsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional()
}).strict();

export const TopicCreateNestedOneWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicCreateNestedOneWithoutFormTopicsInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutFormTopicsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TopicCreateOrConnectWithoutFormTopicsInputSchema).optional(),
  connect: z.lazy(() => TopicWhereUniqueInputSchema).optional()
}).strict();

export const FormUpdateOneRequiredWithoutFormTopicsNestedInputSchema: z.ZodType<Prisma.FormUpdateOneRequiredWithoutFormTopicsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormTopicsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutFormTopicsInputSchema).optional(),
  upsert: z.lazy(() => FormUpsertWithoutFormTopicsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FormUpdateToOneWithWhereWithoutFormTopicsInputSchema),z.lazy(() => FormUpdateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFormTopicsInputSchema) ]).optional(),
}).strict();

export const TopicUpdateOneRequiredWithoutFormTopicsNestedInputSchema: z.ZodType<Prisma.TopicUpdateOneRequiredWithoutFormTopicsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TopicCreateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutFormTopicsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TopicCreateOrConnectWithoutFormTopicsInputSchema).optional(),
  upsert: z.lazy(() => TopicUpsertWithoutFormTopicsInputSchema).optional(),
  connect: z.lazy(() => TopicWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TopicUpdateToOneWithWhereWithoutFormTopicsInputSchema),z.lazy(() => TopicUpdateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutFormTopicsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FormCreateWithoutUserInputSchema: z.ZodType<Prisma.FormCreateWithoutUserInput> = z.object({
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  questions: z.lazy(() => QuestionCreateNestedManyWithoutFormInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  questions: z.lazy(() => QuestionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FormCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormCreateManyUserInputSchema),z.lazy(() => FormCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FormUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FormUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormUpdateWithoutUserInputSchema),z.lazy(() => FormUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FormUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormUpdateWithoutUserInputSchema),z.lazy(() => FormUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FormUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FormUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FormScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormUpdateManyMutationInputSchema),z.lazy(() => FormUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FormScalarWhereInputSchema: z.ZodType<Prisma.FormScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  about: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  logoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutFormsInputSchema: z.ZodType<Prisma.UserCreateWithoutFormsInput> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
}).strict();

export const UserUncheckedCreateWithoutFormsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFormsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string()
}).strict();

export const UserCreateOrConnectWithoutFormsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFormsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFormsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormsInputSchema) ]),
}).strict();

export const QuestionCreateWithoutFormInputSchema: z.ZodType<Prisma.QuestionCreateWithoutFormInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  questionType: z.lazy(() => QuestionTypeCreateNestedOneWithoutQuestionsInputSchema).optional(),
  options: z.lazy(() => OptionCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const QuestionUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.QuestionUncheckedCreateWithoutFormInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  typeId: z.number().int().optional().nullable(),
  options: z.lazy(() => OptionUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const QuestionCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.QuestionCreateOrConnectWithoutFormInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuestionCreateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const QuestionCreateManyFormInputEnvelopeSchema: z.ZodType<Prisma.QuestionCreateManyFormInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuestionCreateManyFormInputSchema),z.lazy(() => QuestionCreateManyFormInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutFormInputSchema: z.ZodType<Prisma.SessionCreateWithoutFormInput> = z.object({
  createdAt: z.coerce.date().optional(),
  responses: z.lazy(() => ResponseCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutFormInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  responses: z.lazy(() => ResponseUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutFormInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutFormInputSchema),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const SessionCreateManyFormInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyFormInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyFormInputSchema),z.lazy(() => SessionCreateManyFormInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FormTopicCreateWithoutFormInputSchema: z.ZodType<Prisma.FormTopicCreateWithoutFormInput> = z.object({
  topic: z.lazy(() => TopicCreateNestedOneWithoutFormTopicsInputSchema)
}).strict();

export const FormTopicUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUncheckedCreateWithoutFormInput> = z.object({
  topicId: z.number().int()
}).strict();

export const FormTopicCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.FormTopicCreateOrConnectWithoutFormInput> = z.object({
  where: z.lazy(() => FormTopicWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormTopicCreateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormTopicCreateManyFormInputEnvelopeSchema: z.ZodType<Prisma.FormTopicCreateManyFormInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormTopicCreateManyFormInputSchema),z.lazy(() => FormTopicCreateManyFormInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutFormsInputSchema: z.ZodType<Prisma.UserUpsertWithoutFormsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFormsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFormsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFormsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFormsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFormsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormsInputSchema) ]),
}).strict();

export const UserUpdateWithoutFormsInputSchema: z.ZodType<Prisma.UserUpdateWithoutFormsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutFormsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFormsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionUpsertWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.QuestionUpsertWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuestionUpdateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutFormInputSchema) ]),
  create: z.union([ z.lazy(() => QuestionCreateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const QuestionUpdateWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.QuestionUpdateWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuestionUpdateWithoutFormInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutFormInputSchema) ]),
}).strict();

export const QuestionUpdateManyWithWhereWithoutFormInputSchema: z.ZodType<Prisma.QuestionUpdateManyWithWhereWithoutFormInput> = z.object({
  where: z.lazy(() => QuestionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuestionUpdateManyMutationInputSchema),z.lazy(() => QuestionUncheckedUpdateManyWithoutFormInputSchema) ]),
}).strict();

export const QuestionScalarWhereInputSchema: z.ZodType<Prisma.QuestionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionScalarWhereInputSchema),z.lazy(() => QuestionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionScalarWhereInputSchema),z.lazy(() => QuestionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  typeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutFormInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutFormInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutFormInputSchema),z.lazy(() => SessionUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutFormInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutFormInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutFormInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutFormInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutFormInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const FormTopicUpsertWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUpsertWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => FormTopicWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormTopicUpdateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedUpdateWithoutFormInputSchema) ]),
  create: z.union([ z.lazy(() => FormTopicCreateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormTopicUpdateWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUpdateWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => FormTopicWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormTopicUpdateWithoutFormInputSchema),z.lazy(() => FormTopicUncheckedUpdateWithoutFormInputSchema) ]),
}).strict();

export const FormTopicUpdateManyWithWhereWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUpdateManyWithWhereWithoutFormInput> = z.object({
  where: z.lazy(() => FormTopicScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormTopicUpdateManyMutationInputSchema),z.lazy(() => FormTopicUncheckedUpdateManyWithoutFormInputSchema) ]),
}).strict();

export const FormTopicScalarWhereInputSchema: z.ZodType<Prisma.FormTopicScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormTopicScalarWhereInputSchema),z.lazy(() => FormTopicScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormTopicScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormTopicScalarWhereInputSchema),z.lazy(() => FormTopicScalarWhereInputSchema).array() ]).optional(),
  formId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  topicId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const QuestionTypeCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeCreateWithoutQuestionsInput> = z.object({
  name: z.string(),
  label: z.string(),
  icon: z.string()
}).strict();

export const QuestionTypeUncheckedCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeUncheckedCreateWithoutQuestionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  label: z.string(),
  icon: z.string()
}).strict();

export const QuestionTypeCreateOrConnectWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeCreateOrConnectWithoutQuestionsInput> = z.object({
  where: z.lazy(() => QuestionTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuestionTypeCreateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedCreateWithoutQuestionsInputSchema) ]),
}).strict();

export const FormCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.FormCreateWithoutQuestionsInput> = z.object({
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFormsInputSchema),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutQuestionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.number().int(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutQuestionsInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutQuestionsInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutQuestionsInputSchema) ]),
}).strict();

export const OptionCreateWithoutQuestionInputSchema: z.ZodType<Prisma.OptionCreateWithoutQuestionInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  Response: z.lazy(() => ResponseCreateNestedManyWithoutOptionInputSchema).optional()
}).strict();

export const OptionUncheckedCreateWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUncheckedCreateWithoutQuestionInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  Response: z.lazy(() => ResponseUncheckedCreateNestedManyWithoutOptionInputSchema).optional()
}).strict();

export const OptionCreateOrConnectWithoutQuestionInputSchema: z.ZodType<Prisma.OptionCreateOrConnectWithoutQuestionInput> = z.object({
  where: z.lazy(() => OptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OptionCreateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const OptionCreateManyQuestionInputEnvelopeSchema: z.ZodType<Prisma.OptionCreateManyQuestionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OptionCreateManyQuestionInputSchema),z.lazy(() => OptionCreateManyQuestionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuestionTypeUpsertWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeUpsertWithoutQuestionsInput> = z.object({
  update: z.union([ z.lazy(() => QuestionTypeUpdateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedUpdateWithoutQuestionsInputSchema) ]),
  create: z.union([ z.lazy(() => QuestionTypeCreateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedCreateWithoutQuestionsInputSchema) ]),
  where: z.lazy(() => QuestionTypeWhereInputSchema).optional()
}).strict();

export const QuestionTypeUpdateToOneWithWhereWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeUpdateToOneWithWhereWithoutQuestionsInput> = z.object({
  where: z.lazy(() => QuestionTypeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => QuestionTypeUpdateWithoutQuestionsInputSchema),z.lazy(() => QuestionTypeUncheckedUpdateWithoutQuestionsInputSchema) ]),
}).strict();

export const QuestionTypeUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeUpdateWithoutQuestionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionTypeUncheckedUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.QuestionTypeUncheckedUpdateWithoutQuestionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormUpsertWithoutQuestionsInputSchema: z.ZodType<Prisma.FormUpsertWithoutQuestionsInput> = z.object({
  update: z.union([ z.lazy(() => FormUpdateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutQuestionsInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutQuestionsInputSchema) ]),
  where: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormUpdateToOneWithWhereWithoutQuestionsInputSchema: z.ZodType<Prisma.FormUpdateToOneWithWhereWithoutQuestionsInput> = z.object({
  where: z.lazy(() => FormWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FormUpdateWithoutQuestionsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutQuestionsInputSchema) ]),
}).strict();

export const FormUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.FormUpdateWithoutQuestionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFormsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutQuestionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const OptionUpsertWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUpsertWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => OptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OptionUpdateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedUpdateWithoutQuestionInputSchema) ]),
  create: z.union([ z.lazy(() => OptionCreateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const OptionUpdateWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUpdateWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => OptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OptionUpdateWithoutQuestionInputSchema),z.lazy(() => OptionUncheckedUpdateWithoutQuestionInputSchema) ]),
}).strict();

export const OptionUpdateManyWithWhereWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUpdateManyWithWhereWithoutQuestionInput> = z.object({
  where: z.lazy(() => OptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OptionUpdateManyMutationInputSchema),z.lazy(() => OptionUncheckedUpdateManyWithoutQuestionInputSchema) ]),
}).strict();

export const OptionScalarWhereInputSchema: z.ZodType<Prisma.OptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OptionScalarWhereInputSchema),z.lazy(() => OptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OptionScalarWhereInputSchema),z.lazy(() => OptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  questionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const QuestionCreateWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionCreateWithoutOptionsInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  questionType: z.lazy(() => QuestionTypeCreateNestedOneWithoutQuestionsInputSchema).optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutQuestionsInputSchema)
}).strict();

export const QuestionUncheckedCreateWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionUncheckedCreateWithoutOptionsInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  typeId: z.number().int().optional().nullable(),
  formId: z.number().int()
}).strict();

export const QuestionCreateOrConnectWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionCreateOrConnectWithoutOptionsInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuestionCreateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutOptionsInputSchema) ]),
}).strict();

export const ResponseCreateWithoutOptionInputSchema: z.ZodType<Prisma.ResponseCreateWithoutOptionInput> = z.object({
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  questionId: z.number().int(),
  session: z.lazy(() => SessionCreateNestedOneWithoutResponsesInputSchema)
}).strict();

export const ResponseUncheckedCreateWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUncheckedCreateWithoutOptionInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  sessionId: z.number().int(),
  questionId: z.number().int()
}).strict();

export const ResponseCreateOrConnectWithoutOptionInputSchema: z.ZodType<Prisma.ResponseCreateOrConnectWithoutOptionInput> = z.object({
  where: z.lazy(() => ResponseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResponseCreateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema) ]),
}).strict();

export const ResponseCreateManyOptionInputEnvelopeSchema: z.ZodType<Prisma.ResponseCreateManyOptionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ResponseCreateManyOptionInputSchema),z.lazy(() => ResponseCreateManyOptionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuestionUpsertWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionUpsertWithoutOptionsInput> = z.object({
  update: z.union([ z.lazy(() => QuestionUpdateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutOptionsInputSchema) ]),
  create: z.union([ z.lazy(() => QuestionCreateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutOptionsInputSchema) ]),
  where: z.lazy(() => QuestionWhereInputSchema).optional()
}).strict();

export const QuestionUpdateToOneWithWhereWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionUpdateToOneWithWhereWithoutOptionsInput> = z.object({
  where: z.lazy(() => QuestionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => QuestionUpdateWithoutOptionsInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutOptionsInputSchema) ]),
}).strict();

export const QuestionUpdateWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionUpdateWithoutOptionsInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  questionType: z.lazy(() => QuestionTypeUpdateOneWithoutQuestionsNestedInputSchema).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional()
}).strict();

export const QuestionUncheckedUpdateWithoutOptionsInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateWithoutOptionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  typeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseUpsertWithWhereUniqueWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUpsertWithWhereUniqueWithoutOptionInput> = z.object({
  where: z.lazy(() => ResponseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ResponseUpdateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedUpdateWithoutOptionInputSchema) ]),
  create: z.union([ z.lazy(() => ResponseCreateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutOptionInputSchema) ]),
}).strict();

export const ResponseUpdateWithWhereUniqueWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUpdateWithWhereUniqueWithoutOptionInput> = z.object({
  where: z.lazy(() => ResponseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ResponseUpdateWithoutOptionInputSchema),z.lazy(() => ResponseUncheckedUpdateWithoutOptionInputSchema) ]),
}).strict();

export const ResponseUpdateManyWithWhereWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUpdateManyWithWhereWithoutOptionInput> = z.object({
  where: z.lazy(() => ResponseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ResponseUpdateManyMutationInputSchema),z.lazy(() => ResponseUncheckedUpdateManyWithoutOptionInputSchema) ]),
}).strict();

export const ResponseScalarWhereInputSchema: z.ZodType<Prisma.ResponseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResponseScalarWhereInputSchema),z.lazy(() => ResponseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResponseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResponseScalarWhereInputSchema),z.lazy(() => ResponseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  questionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  optionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const QuestionCreateWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionCreateWithoutQuestionTypeInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutQuestionsInputSchema),
  options: z.lazy(() => OptionCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const QuestionUncheckedCreateWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUncheckedCreateWithoutQuestionTypeInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  formId: z.number().int(),
  options: z.lazy(() => OptionUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const QuestionCreateOrConnectWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionCreateOrConnectWithoutQuestionTypeInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema) ]),
}).strict();

export const QuestionCreateManyQuestionTypeInputEnvelopeSchema: z.ZodType<Prisma.QuestionCreateManyQuestionTypeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuestionCreateManyQuestionTypeInputSchema),z.lazy(() => QuestionCreateManyQuestionTypeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuestionUpsertWithWhereUniqueWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUpsertWithWhereUniqueWithoutQuestionTypeInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuestionUpdateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutQuestionTypeInputSchema) ]),
  create: z.union([ z.lazy(() => QuestionCreateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedCreateWithoutQuestionTypeInputSchema) ]),
}).strict();

export const QuestionUpdateWithWhereUniqueWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUpdateWithWhereUniqueWithoutQuestionTypeInput> = z.object({
  where: z.lazy(() => QuestionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuestionUpdateWithoutQuestionTypeInputSchema),z.lazy(() => QuestionUncheckedUpdateWithoutQuestionTypeInputSchema) ]),
}).strict();

export const QuestionUpdateManyWithWhereWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUpdateManyWithWhereWithoutQuestionTypeInput> = z.object({
  where: z.lazy(() => QuestionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuestionUpdateManyMutationInputSchema),z.lazy(() => QuestionUncheckedUpdateManyWithoutQuestionTypeInputSchema) ]),
}).strict();

export const FormCreateWithoutSessionsInputSchema: z.ZodType<Prisma.FormCreateWithoutSessionsInput> = z.object({
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFormsInputSchema),
  questions: z.lazy(() => QuestionCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.number().int(),
  questions: z.lazy(() => QuestionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const ResponseCreateWithoutSessionInputSchema: z.ZodType<Prisma.ResponseCreateWithoutSessionInput> = z.object({
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  questionId: z.number().int(),
  option: z.lazy(() => OptionCreateNestedOneWithoutResponseInputSchema)
}).strict();

export const ResponseUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUncheckedCreateWithoutSessionInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  questionId: z.number().int(),
  optionId: z.number().int()
}).strict();

export const ResponseCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.ResponseCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => ResponseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResponseCreateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const ResponseCreateManySessionInputEnvelopeSchema: z.ZodType<Prisma.ResponseCreateManySessionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ResponseCreateManySessionInputSchema),z.lazy(() => ResponseCreateManySessionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FormUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.FormUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => FormUpdateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.FormUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => FormWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FormUpdateWithoutSessionsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const FormUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.FormUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFormsNestedInputSchema).optional(),
  questions: z.lazy(() => QuestionUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const ResponseUpsertWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUpsertWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => ResponseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ResponseUpdateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => ResponseCreateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const ResponseUpdateWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUpdateWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => ResponseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ResponseUpdateWithoutSessionInputSchema),z.lazy(() => ResponseUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const ResponseUpdateManyWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUpdateManyWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => ResponseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ResponseUpdateManyMutationInputSchema),z.lazy(() => ResponseUncheckedUpdateManyWithoutSessionInputSchema) ]),
}).strict();

export const SessionCreateWithoutResponsesInputSchema: z.ZodType<Prisma.SessionCreateWithoutResponsesInput> = z.object({
  createdAt: z.coerce.date().optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateWithoutResponsesInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutResponsesInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  formId: z.number().int()
}).strict();

export const SessionCreateOrConnectWithoutResponsesInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutResponsesInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutResponsesInputSchema) ]),
}).strict();

export const OptionCreateWithoutResponseInputSchema: z.ZodType<Prisma.OptionCreateWithoutResponseInput> = z.object({
  text: z.string(),
  index: z.number().int(),
  question: z.lazy(() => QuestionCreateNestedOneWithoutOptionsInputSchema)
}).strict();

export const OptionUncheckedCreateWithoutResponseInputSchema: z.ZodType<Prisma.OptionUncheckedCreateWithoutResponseInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  questionId: z.number().int()
}).strict();

export const OptionCreateOrConnectWithoutResponseInputSchema: z.ZodType<Prisma.OptionCreateOrConnectWithoutResponseInput> = z.object({
  where: z.lazy(() => OptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OptionCreateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedCreateWithoutResponseInputSchema) ]),
}).strict();

export const SessionUpsertWithoutResponsesInputSchema: z.ZodType<Prisma.SessionUpsertWithoutResponsesInput> = z.object({
  update: z.union([ z.lazy(() => SessionUpdateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutResponsesInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutResponsesInputSchema) ]),
  where: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SessionUpdateToOneWithWhereWithoutResponsesInputSchema: z.ZodType<Prisma.SessionUpdateToOneWithWhereWithoutResponsesInput> = z.object({
  where: z.lazy(() => SessionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SessionUpdateWithoutResponsesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutResponsesInputSchema) ]),
}).strict();

export const SessionUpdateWithoutResponsesInputSchema: z.ZodType<Prisma.SessionUpdateWithoutResponsesInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutResponsesInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutResponsesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OptionUpsertWithoutResponseInputSchema: z.ZodType<Prisma.OptionUpsertWithoutResponseInput> = z.object({
  update: z.union([ z.lazy(() => OptionUpdateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedUpdateWithoutResponseInputSchema) ]),
  create: z.union([ z.lazy(() => OptionCreateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedCreateWithoutResponseInputSchema) ]),
  where: z.lazy(() => OptionWhereInputSchema).optional()
}).strict();

export const OptionUpdateToOneWithWhereWithoutResponseInputSchema: z.ZodType<Prisma.OptionUpdateToOneWithWhereWithoutResponseInput> = z.object({
  where: z.lazy(() => OptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OptionUpdateWithoutResponseInputSchema),z.lazy(() => OptionUncheckedUpdateWithoutResponseInputSchema) ]),
}).strict();

export const OptionUpdateWithoutResponseInputSchema: z.ZodType<Prisma.OptionUpdateWithoutResponseInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => QuestionUpdateOneRequiredWithoutOptionsNestedInputSchema).optional()
}).strict();

export const OptionUncheckedUpdateWithoutResponseInputSchema: z.ZodType<Prisma.OptionUncheckedUpdateWithoutResponseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicCreateWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicCreateWithoutTopicInput> = z.object({
  form: z.lazy(() => FormCreateNestedOneWithoutFormTopicsInputSchema)
}).strict();

export const FormTopicUncheckedCreateWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUncheckedCreateWithoutTopicInput> = z.object({
  formId: z.number().int()
}).strict();

export const FormTopicCreateOrConnectWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicCreateOrConnectWithoutTopicInput> = z.object({
  where: z.lazy(() => FormTopicWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormTopicCreateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema) ]),
}).strict();

export const FormTopicCreateManyTopicInputEnvelopeSchema: z.ZodType<Prisma.FormTopicCreateManyTopicInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormTopicCreateManyTopicInputSchema),z.lazy(() => FormTopicCreateManyTopicInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FormTopicUpsertWithWhereUniqueWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUpsertWithWhereUniqueWithoutTopicInput> = z.object({
  where: z.lazy(() => FormTopicWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormTopicUpdateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedUpdateWithoutTopicInputSchema) ]),
  create: z.union([ z.lazy(() => FormTopicCreateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedCreateWithoutTopicInputSchema) ]),
}).strict();

export const FormTopicUpdateWithWhereUniqueWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUpdateWithWhereUniqueWithoutTopicInput> = z.object({
  where: z.lazy(() => FormTopicWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormTopicUpdateWithoutTopicInputSchema),z.lazy(() => FormTopicUncheckedUpdateWithoutTopicInputSchema) ]),
}).strict();

export const FormTopicUpdateManyWithWhereWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUpdateManyWithWhereWithoutTopicInput> = z.object({
  where: z.lazy(() => FormTopicScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormTopicUpdateManyMutationInputSchema),z.lazy(() => FormTopicUncheckedUpdateManyWithoutTopicInputSchema) ]),
}).strict();

export const FormCreateWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormCreateWithoutFormTopicsInput> = z.object({
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFormsInputSchema),
  questions: z.lazy(() => QuestionCreateNestedManyWithoutFormInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutFormTopicsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.number().int(),
  questions: z.lazy(() => QuestionUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutFormTopicsInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormTopicsInputSchema) ]),
}).strict();

export const TopicCreateWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicCreateWithoutFormTopicsInput> = z.object({
  name: z.string()
}).strict();

export const TopicUncheckedCreateWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicUncheckedCreateWithoutFormTopicsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const TopicCreateOrConnectWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicCreateOrConnectWithoutFormTopicsInput> = z.object({
  where: z.lazy(() => TopicWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TopicCreateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutFormTopicsInputSchema) ]),
}).strict();

export const FormUpsertWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormUpsertWithoutFormTopicsInput> = z.object({
  update: z.union([ z.lazy(() => FormUpdateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFormTopicsInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormTopicsInputSchema) ]),
  where: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormUpdateToOneWithWhereWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormUpdateToOneWithWhereWithoutFormTopicsInput> = z.object({
  where: z.lazy(() => FormWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FormUpdateWithoutFormTopicsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFormTopicsInputSchema) ]),
}).strict();

export const FormUpdateWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormUpdateWithoutFormTopicsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFormsNestedInputSchema).optional(),
  questions: z.lazy(() => QuestionUpdateManyWithoutFormNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutFormTopicsInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutFormTopicsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const TopicUpsertWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicUpsertWithoutFormTopicsInput> = z.object({
  update: z.union([ z.lazy(() => TopicUpdateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutFormTopicsInputSchema) ]),
  create: z.union([ z.lazy(() => TopicCreateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedCreateWithoutFormTopicsInputSchema) ]),
  where: z.lazy(() => TopicWhereInputSchema).optional()
}).strict();

export const TopicUpdateToOneWithWhereWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicUpdateToOneWithWhereWithoutFormTopicsInput> = z.object({
  where: z.lazy(() => TopicWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TopicUpdateWithoutFormTopicsInputSchema),z.lazy(() => TopicUncheckedUpdateWithoutFormTopicsInputSchema) ]),
}).strict();

export const TopicUpdateWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicUpdateWithoutFormTopicsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TopicUncheckedUpdateWithoutFormTopicsInputSchema: z.ZodType<Prisma.TopicUncheckedUpdateWithoutFormTopicsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormCreateManyUserInputSchema: z.ZodType<Prisma.FormCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  about: z.string().optional().nullable(),
  active: z.boolean().optional(),
  logoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormUpdateWithoutUserInputSchema: z.ZodType<Prisma.FormUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUpdateManyWithoutFormNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => QuestionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  formTopics: z.lazy(() => FormTopicUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  about: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionCreateManyFormInputSchema: z.ZodType<Prisma.QuestionCreateManyFormInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  typeId: z.number().int().optional().nullable()
}).strict();

export const SessionCreateManyFormInputSchema: z.ZodType<Prisma.SessionCreateManyFormInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormTopicCreateManyFormInputSchema: z.ZodType<Prisma.FormTopicCreateManyFormInput> = z.object({
  topicId: z.number().int()
}).strict();

export const QuestionUpdateWithoutFormInputSchema: z.ZodType<Prisma.QuestionUpdateWithoutFormInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  questionType: z.lazy(() => QuestionTypeUpdateOneWithoutQuestionsNestedInputSchema).optional(),
  options: z.lazy(() => OptionUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const QuestionUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateWithoutFormInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  typeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.lazy(() => OptionUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const QuestionUncheckedUpdateManyWithoutFormInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateManyWithoutFormInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  typeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutFormInputSchema: z.ZodType<Prisma.SessionUpdateWithoutFormInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  responses: z.lazy(() => ResponseUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutFormInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  responses: z.lazy(() => ResponseUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateManyWithoutFormInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutFormInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicUpdateWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUpdateWithoutFormInput> = z.object({
  topic: z.lazy(() => TopicUpdateOneRequiredWithoutFormTopicsNestedInputSchema).optional()
}).strict();

export const FormTopicUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateWithoutFormInput> = z.object({
  topicId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicUncheckedUpdateManyWithoutFormInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateManyWithoutFormInput> = z.object({
  topicId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OptionCreateManyQuestionInputSchema: z.ZodType<Prisma.OptionCreateManyQuestionInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int()
}).strict();

export const OptionUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUpdateWithoutQuestionInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Response: z.lazy(() => ResponseUpdateManyWithoutOptionNestedInputSchema).optional()
}).strict();

export const OptionUncheckedUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUncheckedUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Response: z.lazy(() => ResponseUncheckedUpdateManyWithoutOptionNestedInputSchema).optional()
}).strict();

export const OptionUncheckedUpdateManyWithoutQuestionInputSchema: z.ZodType<Prisma.OptionUncheckedUpdateManyWithoutQuestionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseCreateManyOptionInputSchema: z.ZodType<Prisma.ResponseCreateManyOptionInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  sessionId: z.number().int(),
  questionId: z.number().int()
}).strict();

export const ResponseUpdateWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUpdateWithoutOptionInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  session: z.lazy(() => SessionUpdateOneRequiredWithoutResponsesNestedInputSchema).optional()
}).strict();

export const ResponseUncheckedUpdateWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateWithoutOptionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseUncheckedUpdateManyWithoutOptionInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateManyWithoutOptionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionCreateManyQuestionTypeInputSchema: z.ZodType<Prisma.QuestionCreateManyQuestionTypeInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  index: z.number().int(),
  required: z.boolean().optional(),
  formId: z.number().int()
}).strict();

export const QuestionUpdateWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUpdateWithoutQuestionTypeInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional(),
  options: z.lazy(() => OptionUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const QuestionUncheckedUpdateWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateWithoutQuestionTypeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.lazy(() => OptionUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const QuestionUncheckedUpdateManyWithoutQuestionTypeInputSchema: z.ZodType<Prisma.QuestionUncheckedUpdateManyWithoutQuestionTypeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseCreateManySessionInputSchema: z.ZodType<Prisma.ResponseCreateManySessionInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  createdAt: z.coerce.date().optional(),
  questionId: z.number().int(),
  optionId: z.number().int()
}).strict();

export const ResponseUpdateWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUpdateWithoutSessionInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.lazy(() => OptionUpdateOneRequiredWithoutResponseNestedInputSchema).optional()
}).strict();

export const ResponseUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  optionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResponseUncheckedUpdateManyWithoutSessionInputSchema: z.ZodType<Prisma.ResponseUncheckedUpdateManyWithoutSessionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  optionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicCreateManyTopicInputSchema: z.ZodType<Prisma.FormTopicCreateManyTopicInput> = z.object({
  formId: z.number().int()
}).strict();

export const FormTopicUpdateWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUpdateWithoutTopicInput> = z.object({
  form: z.lazy(() => FormUpdateOneRequiredWithoutFormTopicsNestedInputSchema).optional()
}).strict();

export const FormTopicUncheckedUpdateWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateWithoutTopicInput> = z.object({
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormTopicUncheckedUpdateManyWithoutTopicInputSchema: z.ZodType<Prisma.FormTopicUncheckedUpdateManyWithoutTopicInput> = z.object({
  formId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const FormFindFirstArgsSchema: z.ZodType<Prisma.FormFindFirstArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormScalarFieldEnumSchema,FormScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FormFindFirstOrThrowArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormScalarFieldEnumSchema,FormScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFindManyArgsSchema: z.ZodType<Prisma.FormFindManyArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormScalarFieldEnumSchema,FormScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormAggregateArgsSchema: z.ZodType<Prisma.FormAggregateArgs> = z.object({
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormGroupByArgsSchema: z.ZodType<Prisma.FormGroupByArgs> = z.object({
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithAggregationInputSchema.array(),FormOrderByWithAggregationInputSchema ]).optional(),
  by: FormScalarFieldEnumSchema.array(),
  having: FormScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormFindUniqueArgsSchema: z.ZodType<Prisma.FormFindUniqueArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FormFindUniqueOrThrowArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const QuestionFindFirstArgsSchema: z.ZodType<Prisma.QuestionFindFirstArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereInputSchema.optional(),
  orderBy: z.union([ QuestionOrderByWithRelationInputSchema.array(),QuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionScalarFieldEnumSchema,QuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QuestionFindFirstOrThrowArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereInputSchema.optional(),
  orderBy: z.union([ QuestionOrderByWithRelationInputSchema.array(),QuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionScalarFieldEnumSchema,QuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionFindManyArgsSchema: z.ZodType<Prisma.QuestionFindManyArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereInputSchema.optional(),
  orderBy: z.union([ QuestionOrderByWithRelationInputSchema.array(),QuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionScalarFieldEnumSchema,QuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionAggregateArgsSchema: z.ZodType<Prisma.QuestionAggregateArgs> = z.object({
  where: QuestionWhereInputSchema.optional(),
  orderBy: z.union([ QuestionOrderByWithRelationInputSchema.array(),QuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const QuestionGroupByArgsSchema: z.ZodType<Prisma.QuestionGroupByArgs> = z.object({
  where: QuestionWhereInputSchema.optional(),
  orderBy: z.union([ QuestionOrderByWithAggregationInputSchema.array(),QuestionOrderByWithAggregationInputSchema ]).optional(),
  by: QuestionScalarFieldEnumSchema.array(),
  having: QuestionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const QuestionFindUniqueArgsSchema: z.ZodType<Prisma.QuestionFindUniqueArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereUniqueInputSchema,
}).strict() ;

export const QuestionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.QuestionFindUniqueOrThrowArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereUniqueInputSchema,
}).strict() ;

export const OptionFindFirstArgsSchema: z.ZodType<Prisma.OptionFindFirstArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereInputSchema.optional(),
  orderBy: z.union([ OptionOrderByWithRelationInputSchema.array(),OptionOrderByWithRelationInputSchema ]).optional(),
  cursor: OptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OptionScalarFieldEnumSchema,OptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OptionFindFirstOrThrowArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereInputSchema.optional(),
  orderBy: z.union([ OptionOrderByWithRelationInputSchema.array(),OptionOrderByWithRelationInputSchema ]).optional(),
  cursor: OptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OptionScalarFieldEnumSchema,OptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OptionFindManyArgsSchema: z.ZodType<Prisma.OptionFindManyArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereInputSchema.optional(),
  orderBy: z.union([ OptionOrderByWithRelationInputSchema.array(),OptionOrderByWithRelationInputSchema ]).optional(),
  cursor: OptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OptionScalarFieldEnumSchema,OptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OptionAggregateArgsSchema: z.ZodType<Prisma.OptionAggregateArgs> = z.object({
  where: OptionWhereInputSchema.optional(),
  orderBy: z.union([ OptionOrderByWithRelationInputSchema.array(),OptionOrderByWithRelationInputSchema ]).optional(),
  cursor: OptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OptionGroupByArgsSchema: z.ZodType<Prisma.OptionGroupByArgs> = z.object({
  where: OptionWhereInputSchema.optional(),
  orderBy: z.union([ OptionOrderByWithAggregationInputSchema.array(),OptionOrderByWithAggregationInputSchema ]).optional(),
  by: OptionScalarFieldEnumSchema.array(),
  having: OptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OptionFindUniqueArgsSchema: z.ZodType<Prisma.OptionFindUniqueArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereUniqueInputSchema,
}).strict() ;

export const OptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OptionFindUniqueOrThrowArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereUniqueInputSchema,
}).strict() ;

export const QuestionTypeFindFirstArgsSchema: z.ZodType<Prisma.QuestionTypeFindFirstArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereInputSchema.optional(),
  orderBy: z.union([ QuestionTypeOrderByWithRelationInputSchema.array(),QuestionTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionTypeScalarFieldEnumSchema,QuestionTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QuestionTypeFindFirstOrThrowArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereInputSchema.optional(),
  orderBy: z.union([ QuestionTypeOrderByWithRelationInputSchema.array(),QuestionTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionTypeScalarFieldEnumSchema,QuestionTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionTypeFindManyArgsSchema: z.ZodType<Prisma.QuestionTypeFindManyArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereInputSchema.optional(),
  orderBy: z.union([ QuestionTypeOrderByWithRelationInputSchema.array(),QuestionTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionTypeScalarFieldEnumSchema,QuestionTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionTypeAggregateArgsSchema: z.ZodType<Prisma.QuestionTypeAggregateArgs> = z.object({
  where: QuestionTypeWhereInputSchema.optional(),
  orderBy: z.union([ QuestionTypeOrderByWithRelationInputSchema.array(),QuestionTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const QuestionTypeGroupByArgsSchema: z.ZodType<Prisma.QuestionTypeGroupByArgs> = z.object({
  where: QuestionTypeWhereInputSchema.optional(),
  orderBy: z.union([ QuestionTypeOrderByWithAggregationInputSchema.array(),QuestionTypeOrderByWithAggregationInputSchema ]).optional(),
  by: QuestionTypeScalarFieldEnumSchema.array(),
  having: QuestionTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const QuestionTypeFindUniqueArgsSchema: z.ZodType<Prisma.QuestionTypeFindUniqueArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereUniqueInputSchema,
}).strict() ;

export const QuestionTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.QuestionTypeFindUniqueOrThrowArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const ResponseFindFirstArgsSchema: z.ZodType<Prisma.ResponseFindFirstArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereInputSchema.optional(),
  orderBy: z.union([ ResponseOrderByWithRelationInputSchema.array(),ResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResponseScalarFieldEnumSchema,ResponseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResponseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResponseFindFirstOrThrowArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereInputSchema.optional(),
  orderBy: z.union([ ResponseOrderByWithRelationInputSchema.array(),ResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResponseScalarFieldEnumSchema,ResponseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResponseFindManyArgsSchema: z.ZodType<Prisma.ResponseFindManyArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereInputSchema.optional(),
  orderBy: z.union([ ResponseOrderByWithRelationInputSchema.array(),ResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResponseScalarFieldEnumSchema,ResponseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResponseAggregateArgsSchema: z.ZodType<Prisma.ResponseAggregateArgs> = z.object({
  where: ResponseWhereInputSchema.optional(),
  orderBy: z.union([ ResponseOrderByWithRelationInputSchema.array(),ResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: ResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResponseGroupByArgsSchema: z.ZodType<Prisma.ResponseGroupByArgs> = z.object({
  where: ResponseWhereInputSchema.optional(),
  orderBy: z.union([ ResponseOrderByWithAggregationInputSchema.array(),ResponseOrderByWithAggregationInputSchema ]).optional(),
  by: ResponseScalarFieldEnumSchema.array(),
  having: ResponseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResponseFindUniqueArgsSchema: z.ZodType<Prisma.ResponseFindUniqueArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereUniqueInputSchema,
}).strict() ;

export const ResponseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResponseFindUniqueOrThrowArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereUniqueInputSchema,
}).strict() ;

export const TopicFindFirstArgsSchema: z.ZodType<Prisma.TopicFindFirstArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TopicScalarFieldEnumSchema,TopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TopicFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TopicFindFirstOrThrowArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TopicScalarFieldEnumSchema,TopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TopicFindManyArgsSchema: z.ZodType<Prisma.TopicFindManyArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TopicScalarFieldEnumSchema,TopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TopicAggregateArgsSchema: z.ZodType<Prisma.TopicAggregateArgs> = z.object({
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithRelationInputSchema.array(),TopicOrderByWithRelationInputSchema ]).optional(),
  cursor: TopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TopicGroupByArgsSchema: z.ZodType<Prisma.TopicGroupByArgs> = z.object({
  where: TopicWhereInputSchema.optional(),
  orderBy: z.union([ TopicOrderByWithAggregationInputSchema.array(),TopicOrderByWithAggregationInputSchema ]).optional(),
  by: TopicScalarFieldEnumSchema.array(),
  having: TopicScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TopicFindUniqueArgsSchema: z.ZodType<Prisma.TopicFindUniqueArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const TopicFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TopicFindUniqueOrThrowArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const FormTopicFindFirstArgsSchema: z.ZodType<Prisma.FormTopicFindFirstArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereInputSchema.optional(),
  orderBy: z.union([ FormTopicOrderByWithRelationInputSchema.array(),FormTopicOrderByWithRelationInputSchema ]).optional(),
  cursor: FormTopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormTopicScalarFieldEnumSchema,FormTopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormTopicFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FormTopicFindFirstOrThrowArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereInputSchema.optional(),
  orderBy: z.union([ FormTopicOrderByWithRelationInputSchema.array(),FormTopicOrderByWithRelationInputSchema ]).optional(),
  cursor: FormTopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormTopicScalarFieldEnumSchema,FormTopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormTopicFindManyArgsSchema: z.ZodType<Prisma.FormTopicFindManyArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereInputSchema.optional(),
  orderBy: z.union([ FormTopicOrderByWithRelationInputSchema.array(),FormTopicOrderByWithRelationInputSchema ]).optional(),
  cursor: FormTopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormTopicScalarFieldEnumSchema,FormTopicScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormTopicAggregateArgsSchema: z.ZodType<Prisma.FormTopicAggregateArgs> = z.object({
  where: FormTopicWhereInputSchema.optional(),
  orderBy: z.union([ FormTopicOrderByWithRelationInputSchema.array(),FormTopicOrderByWithRelationInputSchema ]).optional(),
  cursor: FormTopicWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormTopicGroupByArgsSchema: z.ZodType<Prisma.FormTopicGroupByArgs> = z.object({
  where: FormTopicWhereInputSchema.optional(),
  orderBy: z.union([ FormTopicOrderByWithAggregationInputSchema.array(),FormTopicOrderByWithAggregationInputSchema ]).optional(),
  by: FormTopicScalarFieldEnumSchema.array(),
  having: FormTopicScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormTopicFindUniqueArgsSchema: z.ZodType<Prisma.FormTopicFindUniqueArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereUniqueInputSchema,
}).strict() ;

export const FormTopicFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FormTopicFindUniqueOrThrowArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const FormCreateArgsSchema: z.ZodType<Prisma.FormCreateArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  data: z.union([ FormCreateInputSchema,FormUncheckedCreateInputSchema ]),
}).strict() ;

export const FormUpsertArgsSchema: z.ZodType<Prisma.FormUpsertArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
  create: z.union([ FormCreateInputSchema,FormUncheckedCreateInputSchema ]),
  update: z.union([ FormUpdateInputSchema,FormUncheckedUpdateInputSchema ]),
}).strict() ;

export const FormCreateManyArgsSchema: z.ZodType<Prisma.FormCreateManyArgs> = z.object({
  data: z.union([ FormCreateManyInputSchema,FormCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormDeleteArgsSchema: z.ZodType<Prisma.FormDeleteArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormUpdateArgsSchema: z.ZodType<Prisma.FormUpdateArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  data: z.union([ FormUpdateInputSchema,FormUncheckedUpdateInputSchema ]),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormUpdateManyArgsSchema: z.ZodType<Prisma.FormUpdateManyArgs> = z.object({
  data: z.union([ FormUpdateManyMutationInputSchema,FormUncheckedUpdateManyInputSchema ]),
  where: FormWhereInputSchema.optional(),
}).strict() ;

export const FormDeleteManyArgsSchema: z.ZodType<Prisma.FormDeleteManyArgs> = z.object({
  where: FormWhereInputSchema.optional(),
}).strict() ;

export const QuestionCreateArgsSchema: z.ZodType<Prisma.QuestionCreateArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  data: z.union([ QuestionCreateInputSchema,QuestionUncheckedCreateInputSchema ]),
}).strict() ;

export const QuestionUpsertArgsSchema: z.ZodType<Prisma.QuestionUpsertArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereUniqueInputSchema,
  create: z.union([ QuestionCreateInputSchema,QuestionUncheckedCreateInputSchema ]),
  update: z.union([ QuestionUpdateInputSchema,QuestionUncheckedUpdateInputSchema ]),
}).strict() ;

export const QuestionCreateManyArgsSchema: z.ZodType<Prisma.QuestionCreateManyArgs> = z.object({
  data: z.union([ QuestionCreateManyInputSchema,QuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const QuestionDeleteArgsSchema: z.ZodType<Prisma.QuestionDeleteArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  where: QuestionWhereUniqueInputSchema,
}).strict() ;

export const QuestionUpdateArgsSchema: z.ZodType<Prisma.QuestionUpdateArgs> = z.object({
  select: QuestionSelectSchema.optional(),
  include: QuestionIncludeSchema.optional(),
  data: z.union([ QuestionUpdateInputSchema,QuestionUncheckedUpdateInputSchema ]),
  where: QuestionWhereUniqueInputSchema,
}).strict() ;

export const QuestionUpdateManyArgsSchema: z.ZodType<Prisma.QuestionUpdateManyArgs> = z.object({
  data: z.union([ QuestionUpdateManyMutationInputSchema,QuestionUncheckedUpdateManyInputSchema ]),
  where: QuestionWhereInputSchema.optional(),
}).strict() ;

export const QuestionDeleteManyArgsSchema: z.ZodType<Prisma.QuestionDeleteManyArgs> = z.object({
  where: QuestionWhereInputSchema.optional(),
}).strict() ;

export const OptionCreateArgsSchema: z.ZodType<Prisma.OptionCreateArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  data: z.union([ OptionCreateInputSchema,OptionUncheckedCreateInputSchema ]),
}).strict() ;

export const OptionUpsertArgsSchema: z.ZodType<Prisma.OptionUpsertArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereUniqueInputSchema,
  create: z.union([ OptionCreateInputSchema,OptionUncheckedCreateInputSchema ]),
  update: z.union([ OptionUpdateInputSchema,OptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const OptionCreateManyArgsSchema: z.ZodType<Prisma.OptionCreateManyArgs> = z.object({
  data: z.union([ OptionCreateManyInputSchema,OptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const OptionDeleteArgsSchema: z.ZodType<Prisma.OptionDeleteArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  where: OptionWhereUniqueInputSchema,
}).strict() ;

export const OptionUpdateArgsSchema: z.ZodType<Prisma.OptionUpdateArgs> = z.object({
  select: OptionSelectSchema.optional(),
  include: OptionIncludeSchema.optional(),
  data: z.union([ OptionUpdateInputSchema,OptionUncheckedUpdateInputSchema ]),
  where: OptionWhereUniqueInputSchema,
}).strict() ;

export const OptionUpdateManyArgsSchema: z.ZodType<Prisma.OptionUpdateManyArgs> = z.object({
  data: z.union([ OptionUpdateManyMutationInputSchema,OptionUncheckedUpdateManyInputSchema ]),
  where: OptionWhereInputSchema.optional(),
}).strict() ;

export const OptionDeleteManyArgsSchema: z.ZodType<Prisma.OptionDeleteManyArgs> = z.object({
  where: OptionWhereInputSchema.optional(),
}).strict() ;

export const QuestionTypeCreateArgsSchema: z.ZodType<Prisma.QuestionTypeCreateArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  data: z.union([ QuestionTypeCreateInputSchema,QuestionTypeUncheckedCreateInputSchema ]),
}).strict() ;

export const QuestionTypeUpsertArgsSchema: z.ZodType<Prisma.QuestionTypeUpsertArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereUniqueInputSchema,
  create: z.union([ QuestionTypeCreateInputSchema,QuestionTypeUncheckedCreateInputSchema ]),
  update: z.union([ QuestionTypeUpdateInputSchema,QuestionTypeUncheckedUpdateInputSchema ]),
}).strict() ;

export const QuestionTypeCreateManyArgsSchema: z.ZodType<Prisma.QuestionTypeCreateManyArgs> = z.object({
  data: z.union([ QuestionTypeCreateManyInputSchema,QuestionTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const QuestionTypeDeleteArgsSchema: z.ZodType<Prisma.QuestionTypeDeleteArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  where: QuestionTypeWhereUniqueInputSchema,
}).strict() ;

export const QuestionTypeUpdateArgsSchema: z.ZodType<Prisma.QuestionTypeUpdateArgs> = z.object({
  select: QuestionTypeSelectSchema.optional(),
  include: QuestionTypeIncludeSchema.optional(),
  data: z.union([ QuestionTypeUpdateInputSchema,QuestionTypeUncheckedUpdateInputSchema ]),
  where: QuestionTypeWhereUniqueInputSchema,
}).strict() ;

export const QuestionTypeUpdateManyArgsSchema: z.ZodType<Prisma.QuestionTypeUpdateManyArgs> = z.object({
  data: z.union([ QuestionTypeUpdateManyMutationInputSchema,QuestionTypeUncheckedUpdateManyInputSchema ]),
  where: QuestionTypeWhereInputSchema.optional(),
}).strict() ;

export const QuestionTypeDeleteManyArgsSchema: z.ZodType<Prisma.QuestionTypeDeleteManyArgs> = z.object({
  where: QuestionTypeWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const ResponseCreateArgsSchema: z.ZodType<Prisma.ResponseCreateArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  data: z.union([ ResponseCreateInputSchema,ResponseUncheckedCreateInputSchema ]),
}).strict() ;

export const ResponseUpsertArgsSchema: z.ZodType<Prisma.ResponseUpsertArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereUniqueInputSchema,
  create: z.union([ ResponseCreateInputSchema,ResponseUncheckedCreateInputSchema ]),
  update: z.union([ ResponseUpdateInputSchema,ResponseUncheckedUpdateInputSchema ]),
}).strict() ;

export const ResponseCreateManyArgsSchema: z.ZodType<Prisma.ResponseCreateManyArgs> = z.object({
  data: z.union([ ResponseCreateManyInputSchema,ResponseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ResponseDeleteArgsSchema: z.ZodType<Prisma.ResponseDeleteArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  where: ResponseWhereUniqueInputSchema,
}).strict() ;

export const ResponseUpdateArgsSchema: z.ZodType<Prisma.ResponseUpdateArgs> = z.object({
  select: ResponseSelectSchema.optional(),
  include: ResponseIncludeSchema.optional(),
  data: z.union([ ResponseUpdateInputSchema,ResponseUncheckedUpdateInputSchema ]),
  where: ResponseWhereUniqueInputSchema,
}).strict() ;

export const ResponseUpdateManyArgsSchema: z.ZodType<Prisma.ResponseUpdateManyArgs> = z.object({
  data: z.union([ ResponseUpdateManyMutationInputSchema,ResponseUncheckedUpdateManyInputSchema ]),
  where: ResponseWhereInputSchema.optional(),
}).strict() ;

export const ResponseDeleteManyArgsSchema: z.ZodType<Prisma.ResponseDeleteManyArgs> = z.object({
  where: ResponseWhereInputSchema.optional(),
}).strict() ;

export const TopicCreateArgsSchema: z.ZodType<Prisma.TopicCreateArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  data: z.union([ TopicCreateInputSchema,TopicUncheckedCreateInputSchema ]),
}).strict() ;

export const TopicUpsertArgsSchema: z.ZodType<Prisma.TopicUpsertArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
  create: z.union([ TopicCreateInputSchema,TopicUncheckedCreateInputSchema ]),
  update: z.union([ TopicUpdateInputSchema,TopicUncheckedUpdateInputSchema ]),
}).strict() ;

export const TopicCreateManyArgsSchema: z.ZodType<Prisma.TopicCreateManyArgs> = z.object({
  data: z.union([ TopicCreateManyInputSchema,TopicCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TopicDeleteArgsSchema: z.ZodType<Prisma.TopicDeleteArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const TopicUpdateArgsSchema: z.ZodType<Prisma.TopicUpdateArgs> = z.object({
  select: TopicSelectSchema.optional(),
  include: TopicIncludeSchema.optional(),
  data: z.union([ TopicUpdateInputSchema,TopicUncheckedUpdateInputSchema ]),
  where: TopicWhereUniqueInputSchema,
}).strict() ;

export const TopicUpdateManyArgsSchema: z.ZodType<Prisma.TopicUpdateManyArgs> = z.object({
  data: z.union([ TopicUpdateManyMutationInputSchema,TopicUncheckedUpdateManyInputSchema ]),
  where: TopicWhereInputSchema.optional(),
}).strict() ;

export const TopicDeleteManyArgsSchema: z.ZodType<Prisma.TopicDeleteManyArgs> = z.object({
  where: TopicWhereInputSchema.optional(),
}).strict() ;

export const FormTopicCreateArgsSchema: z.ZodType<Prisma.FormTopicCreateArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  data: z.union([ FormTopicCreateInputSchema,FormTopicUncheckedCreateInputSchema ]),
}).strict() ;

export const FormTopicUpsertArgsSchema: z.ZodType<Prisma.FormTopicUpsertArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereUniqueInputSchema,
  create: z.union([ FormTopicCreateInputSchema,FormTopicUncheckedCreateInputSchema ]),
  update: z.union([ FormTopicUpdateInputSchema,FormTopicUncheckedUpdateInputSchema ]),
}).strict() ;

export const FormTopicCreateManyArgsSchema: z.ZodType<Prisma.FormTopicCreateManyArgs> = z.object({
  data: z.union([ FormTopicCreateManyInputSchema,FormTopicCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormTopicDeleteArgsSchema: z.ZodType<Prisma.FormTopicDeleteArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  where: FormTopicWhereUniqueInputSchema,
}).strict() ;

export const FormTopicUpdateArgsSchema: z.ZodType<Prisma.FormTopicUpdateArgs> = z.object({
  select: FormTopicSelectSchema.optional(),
  include: FormTopicIncludeSchema.optional(),
  data: z.union([ FormTopicUpdateInputSchema,FormTopicUncheckedUpdateInputSchema ]),
  where: FormTopicWhereUniqueInputSchema,
}).strict() ;

export const FormTopicUpdateManyArgsSchema: z.ZodType<Prisma.FormTopicUpdateManyArgs> = z.object({
  data: z.union([ FormTopicUpdateManyMutationInputSchema,FormTopicUncheckedUpdateManyInputSchema ]),
  where: FormTopicWhereInputSchema.optional(),
}).strict() ;

export const FormTopicDeleteManyArgsSchema: z.ZodType<Prisma.FormTopicDeleteManyArgs> = z.object({
  where: FormTopicWhereInputSchema.optional(),
}).strict() ;