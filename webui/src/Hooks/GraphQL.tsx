import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** An action is a command that is run in a job. */
export type Action = {
  __typename?: 'Action';
  commands: Scalars['String'];
  enabled: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  plugin: Scalars['String'];
  useWasm: Scalars['Boolean'];
};

export type ActionInput = {
  commands: Scalars['String'];
  enabled: Scalars['Boolean'];
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  plugin: Scalars['String'];
  useWasm: Scalars['Boolean'];
};

/** A job is a task that is run in a project. */
export type Job = {
  __typename?: 'Job';
  createdAt: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  logs?: Maybe<Array<Log>>;
  name: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** A log is a message that is created during a job. */
export type Log = {
  __typename?: 'Log';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  jobId?: Maybe<Scalars['ID']>;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  runJob: Job;
  runPipeline: Run;
  saveActions: Array<Action>;
};


export type MutationRunJobArgs = {
  jobName?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['ID']>;
};


export type MutationRunPipelineArgs = {
  projectId?: InputMaybe<Scalars['ID']>;
};


export type MutationSaveActionsArgs = {
  actions: Array<ActionInput>;
  projectId: Scalars['ID'];
};

/** A project is a collection of actions. */
export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String'];
  cursor?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  logs?: Maybe<Log>;
  name: Scalars['String'];
  path: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  actions?: Maybe<Array<Action>>;
  countProjects: Scalars['Int'];
  countRuns: Scalars['Int'];
  getRun?: Maybe<Run>;
  getRuns?: Maybe<Array<Run>>;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  log?: Maybe<Log>;
  logs: Array<Log>;
  project?: Maybe<Project>;
  projects: Array<Project>;
};


export type QueryActionsArgs = {
  projectId: Scalars['ID'];
};


export type QueryCountRunsArgs = {
  projectId: Scalars['ID'];
};


export type QueryGetRunArgs = {
  id: Scalars['ID'];
};


export type QueryGetRunsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['ID'];
  reverse?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryJobArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryLogsArgs = {
  jobId?: InputMaybe<Scalars['ID']>;
  projectId?: InputMaybe<Scalars['ID']>;
};


export type QueryProjectArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryProjectsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};

/** A Pipeline execution */
export type Run = {
  __typename?: 'Run';
  author?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  commit?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  duration: Scalars['Int'];
  id: Scalars['ID'];
  jobs: Array<Job>;
  message?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  project: Scalars['String'];
  projectId: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type SaveActionsMutationVariables = Exact<{
  projectId: Scalars['ID'];
  actions: Array<ActionInput> | ActionInput;
}>;


export type SaveActionsMutation = { __typename?: 'Mutation', saveActions: Array<{ __typename?: 'Action', id?: string | null, commands: string, enabled: boolean, logo?: string | null, name: string, plugin: string, useWasm: boolean }> };

export type GetActionsQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type GetActionsQuery = { __typename?: 'Query', actions?: Array<{ __typename?: 'Action', id?: string | null, commands: string, enabled: boolean, logo?: string | null, name: string, plugin: string, useWasm: boolean }> | null };

export type ProjectFragmentFragment = { __typename?: 'Project', id: string, name: string, path: string, createdAt: string };

export type LogFragmentFragment = { __typename?: 'Log', id: string, message: string, createdAt: string };

export type JobFragmentFragment = { __typename?: 'Job', id: string, name: string, createdAt: string, duration?: number | null, status: string };

export type RunFragmentFragment = { __typename?: 'Run', id: string, branch?: string | null, commit?: string | null, date: string, project: string, projectId: string, duration: number, message?: string | null, name: string, title: string, cursor?: string | null, status?: string | null, jobs: Array<{ __typename?: 'Job', id: string, name: string, createdAt: string, status: string, duration?: number | null }> };

export type ActionFragmentFragment = { __typename?: 'Action', id?: string | null, commands: string, enabled: boolean, logo?: string | null, name: string, plugin: string, useWasm: boolean };

export type RunJobMutationVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>;
  jobName?: InputMaybe<Scalars['String']>;
}>;


export type RunJobMutation = { __typename?: 'Mutation', runJob: { __typename?: 'Job', id: string, name: string, duration?: number | null, status: string, createdAt: string } };

export type GetJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, name: string, createdAt: string, duration?: number | null, status: string }> };

export type GetJobQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetJobQuery = { __typename?: 'Query', job?: { __typename?: 'Job', id: string, name: string, status: string, createdAt: string, duration?: number | null, logs?: Array<{ __typename?: 'Log', id: string, message: string, createdAt: string }> | null } | null };

export type GetLogsQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>;
  jobId?: InputMaybe<Scalars['ID']>;
}>;


export type GetLogsQuery = { __typename?: 'Query', logs: Array<{ __typename?: 'Log', id: string, message: string, createdAt: string }> };

export type CreateProjectMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, path: string, createdAt: string } };

export type GetProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, path: string, createdAt: string }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, path: string, createdAt: string, cursor?: string | null } | null };

export type CountProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountProjectsQuery = { __typename?: 'Query', countProjects: number };

export type RunPipelineMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type RunPipelineMutation = { __typename?: 'Mutation', runPipeline: { __typename?: 'Run', id: string, branch?: string | null, commit?: string | null, date: string, project: string, projectId: string, duration: number, message?: string | null, name: string, title: string, cursor?: string | null, status?: string | null, jobs: Array<{ __typename?: 'Job', id: string, name: string, createdAt: string, status: string, duration?: number | null }> } };

export type GetRunQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRunQuery = { __typename?: 'Query', getRun?: { __typename?: 'Run', id: string, branch?: string | null, commit?: string | null, date: string, project: string, projectId: string, duration: number, message?: string | null, name: string, title: string, cursor?: string | null, status?: string | null, jobs: Array<{ __typename?: 'Job', id: string, name: string, createdAt: string, status: string, duration?: number | null, startedAt?: string | null, logs?: Array<{ __typename?: 'Log', id: string, message: string, createdAt: string }> | null }> } | null };

export type GetRunsQueryVariables = Exact<{
  projectId: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetRunsQuery = { __typename?: 'Query', getRuns?: Array<{ __typename?: 'Run', id: string, branch?: string | null, commit?: string | null, date: string, project: string, projectId: string, duration: number, message?: string | null, name: string, title: string, cursor?: string | null, status?: string | null, jobs: Array<{ __typename?: 'Job', id: string, name: string, createdAt: string, status: string, duration?: number | null }> }> | null };

export type CountRunsQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type CountRunsQuery = { __typename?: 'Query', countRuns: number };

export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  name
  path
  createdAt
}
    `;
export const LogFragmentFragmentDoc = gql`
    fragment LogFragment on Log {
  id
  message
  createdAt
}
    `;
export const JobFragmentFragmentDoc = gql`
    fragment JobFragment on Job {
  id
  name
  createdAt
  duration
  status
}
    `;
export const RunFragmentFragmentDoc = gql`
    fragment RunFragment on Run {
  id
  branch
  commit
  date
  project
  projectId
  duration
  jobs {
    id
    name
    createdAt
    status
    duration
  }
  message
  name
  title
  cursor
  status
}
    `;
export const ActionFragmentFragmentDoc = gql`
    fragment ActionFragment on Action {
  id
  commands
  enabled
  logo
  name
  plugin
  useWasm
}
    `;
export const SaveActionsDocument = gql`
    mutation SaveActions($projectId: ID!, $actions: [ActionInput!]!) {
  saveActions(projectId: $projectId, actions: $actions) {
    ...ActionFragment
  }
}
    ${ActionFragmentFragmentDoc}`;
export type SaveActionsMutationFn = Apollo.MutationFunction<SaveActionsMutation, SaveActionsMutationVariables>;

/**
 * __useSaveActionsMutation__
 *
 * To run a mutation, you first call `useSaveActionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveActionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveActionsMutation, { data, loading, error }] = useSaveActionsMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      actions: // value for 'actions'
 *   },
 * });
 */
export function useSaveActionsMutation(baseOptions?: Apollo.MutationHookOptions<SaveActionsMutation, SaveActionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveActionsMutation, SaveActionsMutationVariables>(SaveActionsDocument, options);
      }
export type SaveActionsMutationHookResult = ReturnType<typeof useSaveActionsMutation>;
export type SaveActionsMutationResult = Apollo.MutationResult<SaveActionsMutation>;
export type SaveActionsMutationOptions = Apollo.BaseMutationOptions<SaveActionsMutation, SaveActionsMutationVariables>;
export const GetActionsDocument = gql`
    query GetActions($projectId: ID!) {
  actions(projectId: $projectId) {
    ...ActionFragment
  }
}
    ${ActionFragmentFragmentDoc}`;

/**
 * __useGetActionsQuery__
 *
 * To run a query within a React component, call `useGetActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActionsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetActionsQuery(baseOptions: Apollo.QueryHookOptions<GetActionsQuery, GetActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActionsQuery, GetActionsQueryVariables>(GetActionsDocument, options);
      }
export function useGetActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActionsQuery, GetActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActionsQuery, GetActionsQueryVariables>(GetActionsDocument, options);
        }
export type GetActionsQueryHookResult = ReturnType<typeof useGetActionsQuery>;
export type GetActionsLazyQueryHookResult = ReturnType<typeof useGetActionsLazyQuery>;
export type GetActionsQueryResult = Apollo.QueryResult<GetActionsQuery, GetActionsQueryVariables>;
export const RunJobDocument = gql`
    mutation RunJob($projectId: ID, $jobName: String) {
  runJob(projectId: $projectId, jobName: $jobName) {
    id
    name
    duration
    status
    createdAt
  }
}
    `;
export type RunJobMutationFn = Apollo.MutationFunction<RunJobMutation, RunJobMutationVariables>;

/**
 * __useRunJobMutation__
 *
 * To run a mutation, you first call `useRunJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runJobMutation, { data, loading, error }] = useRunJobMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      jobName: // value for 'jobName'
 *   },
 * });
 */
export function useRunJobMutation(baseOptions?: Apollo.MutationHookOptions<RunJobMutation, RunJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunJobMutation, RunJobMutationVariables>(RunJobDocument, options);
      }
export type RunJobMutationHookResult = ReturnType<typeof useRunJobMutation>;
export type RunJobMutationResult = Apollo.MutationResult<RunJobMutation>;
export type RunJobMutationOptions = Apollo.BaseMutationOptions<RunJobMutation, RunJobMutationVariables>;
export const GetJobsDocument = gql`
    query GetJobs {
  jobs {
    ...JobFragment
  }
}
    ${JobFragmentFragmentDoc}`;

/**
 * __useGetJobsQuery__
 *
 * To run a query within a React component, call `useGetJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJobsQuery(baseOptions?: Apollo.QueryHookOptions<GetJobsQuery, GetJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobsQuery, GetJobsQueryVariables>(GetJobsDocument, options);
      }
export function useGetJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobsQuery, GetJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobsQuery, GetJobsQueryVariables>(GetJobsDocument, options);
        }
export type GetJobsQueryHookResult = ReturnType<typeof useGetJobsQuery>;
export type GetJobsLazyQueryHookResult = ReturnType<typeof useGetJobsLazyQuery>;
export type GetJobsQueryResult = Apollo.QueryResult<GetJobsQuery, GetJobsQueryVariables>;
export const GetJobDocument = gql`
    query GetJob($id: ID) {
  job(id: $id) {
    id
    name
    status
    createdAt
    duration
    logs {
      id
      message
      createdAt
    }
  }
}
    `;

/**
 * __useGetJobQuery__
 *
 * To run a query within a React component, call `useGetJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJobQuery(baseOptions?: Apollo.QueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
      }
export function useGetJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
export type GetJobQueryHookResult = ReturnType<typeof useGetJobQuery>;
export type GetJobLazyQueryHookResult = ReturnType<typeof useGetJobLazyQuery>;
export type GetJobQueryResult = Apollo.QueryResult<GetJobQuery, GetJobQueryVariables>;
export const GetLogsDocument = gql`
    query GetLogs($projectId: ID, $jobId: ID) {
  logs(projectId: $projectId, jobId: $jobId) {
    ...LogFragment
  }
}
    ${LogFragmentFragmentDoc}`;

/**
 * __useGetLogsQuery__
 *
 * To run a query within a React component, call `useGetLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetLogsQuery(baseOptions?: Apollo.QueryHookOptions<GetLogsQuery, GetLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLogsQuery, GetLogsQueryVariables>(GetLogsDocument, options);
      }
export function useGetLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLogsQuery, GetLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLogsQuery, GetLogsQueryVariables>(GetLogsDocument, options);
        }
export type GetLogsQueryHookResult = ReturnType<typeof useGetLogsQuery>;
export type GetLogsLazyQueryHookResult = ReturnType<typeof useGetLogsLazyQuery>;
export type GetLogsQueryResult = Apollo.QueryResult<GetLogsQuery, GetLogsQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject {
  createProject {
    ...ProjectFragment
  }
}
    ${ProjectFragmentFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectsDocument = gql`
    query GetProjects($cursor: String, $limit: Int, $skip: Int) {
  projects(cursor: $cursor, limit: $limit, skip: $skip) {
    ...ProjectFragment
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: ID!) {
  project(id: $id) {
    id
    name
    path
    createdAt
    cursor
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const CountProjectsDocument = gql`
    query CountProjects {
  countProjects
}
    `;

/**
 * __useCountProjectsQuery__
 *
 * To run a query within a React component, call `useCountProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountProjectsQuery(baseOptions?: Apollo.QueryHookOptions<CountProjectsQuery, CountProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountProjectsQuery, CountProjectsQueryVariables>(CountProjectsDocument, options);
      }
export function useCountProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountProjectsQuery, CountProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountProjectsQuery, CountProjectsQueryVariables>(CountProjectsDocument, options);
        }
export type CountProjectsQueryHookResult = ReturnType<typeof useCountProjectsQuery>;
export type CountProjectsLazyQueryHookResult = ReturnType<typeof useCountProjectsLazyQuery>;
export type CountProjectsQueryResult = Apollo.QueryResult<CountProjectsQuery, CountProjectsQueryVariables>;
export const RunPipelineDocument = gql`
    mutation RunPipeline($projectId: ID!) {
  runPipeline(projectId: $projectId) {
    ...RunFragment
  }
}
    ${RunFragmentFragmentDoc}`;
export type RunPipelineMutationFn = Apollo.MutationFunction<RunPipelineMutation, RunPipelineMutationVariables>;

/**
 * __useRunPipelineMutation__
 *
 * To run a mutation, you first call `useRunPipelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunPipelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runPipelineMutation, { data, loading, error }] = useRunPipelineMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRunPipelineMutation(baseOptions?: Apollo.MutationHookOptions<RunPipelineMutation, RunPipelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunPipelineMutation, RunPipelineMutationVariables>(RunPipelineDocument, options);
      }
export type RunPipelineMutationHookResult = ReturnType<typeof useRunPipelineMutation>;
export type RunPipelineMutationResult = Apollo.MutationResult<RunPipelineMutation>;
export type RunPipelineMutationOptions = Apollo.BaseMutationOptions<RunPipelineMutation, RunPipelineMutationVariables>;
export const GetRunDocument = gql`
    query GetRun($id: ID!) {
  getRun(id: $id) {
    id
    branch
    commit
    date
    project
    projectId
    duration
    jobs {
      id
      name
      createdAt
      status
      duration
      logs {
        id
        message
        createdAt
      }
      startedAt
    }
    message
    name
    title
    cursor
    status
  }
}
    `;

/**
 * __useGetRunQuery__
 *
 * To run a query within a React component, call `useGetRunQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRunQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRunQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRunQuery(baseOptions: Apollo.QueryHookOptions<GetRunQuery, GetRunQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRunQuery, GetRunQueryVariables>(GetRunDocument, options);
      }
export function useGetRunLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRunQuery, GetRunQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRunQuery, GetRunQueryVariables>(GetRunDocument, options);
        }
export type GetRunQueryHookResult = ReturnType<typeof useGetRunQuery>;
export type GetRunLazyQueryHookResult = ReturnType<typeof useGetRunLazyQuery>;
export type GetRunQueryResult = Apollo.QueryResult<GetRunQuery, GetRunQueryVariables>;
export const GetRunsDocument = gql`
    query GetRuns($projectId: ID!, $cursor: String, $limit: Int, $skip: Int) {
  getRuns(projectId: $projectId, cursor: $cursor, limit: $limit, skip: $skip) {
    ...RunFragment
  }
}
    ${RunFragmentFragmentDoc}`;

/**
 * __useGetRunsQuery__
 *
 * To run a query within a React component, call `useGetRunsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRunsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRunsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetRunsQuery(baseOptions: Apollo.QueryHookOptions<GetRunsQuery, GetRunsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRunsQuery, GetRunsQueryVariables>(GetRunsDocument, options);
      }
export function useGetRunsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRunsQuery, GetRunsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRunsQuery, GetRunsQueryVariables>(GetRunsDocument, options);
        }
export type GetRunsQueryHookResult = ReturnType<typeof useGetRunsQuery>;
export type GetRunsLazyQueryHookResult = ReturnType<typeof useGetRunsLazyQuery>;
export type GetRunsQueryResult = Apollo.QueryResult<GetRunsQuery, GetRunsQueryVariables>;
export const CountRunsDocument = gql`
    query CountRuns($projectId: ID!) {
  countRuns(projectId: $projectId)
}
    `;

/**
 * __useCountRunsQuery__
 *
 * To run a query within a React component, call `useCountRunsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountRunsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountRunsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCountRunsQuery(baseOptions: Apollo.QueryHookOptions<CountRunsQuery, CountRunsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountRunsQuery, CountRunsQueryVariables>(CountRunsDocument, options);
      }
export function useCountRunsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountRunsQuery, CountRunsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountRunsQuery, CountRunsQueryVariables>(CountRunsDocument, options);
        }
export type CountRunsQueryHookResult = ReturnType<typeof useCountRunsQuery>;
export type CountRunsLazyQueryHookResult = ReturnType<typeof useCountRunsLazyQuery>;
export type CountRunsQueryResult = Apollo.QueryResult<CountRunsQuery, CountRunsQueryVariables>;