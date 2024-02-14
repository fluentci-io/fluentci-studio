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

/** A job is a task that is run in a project. */
export type Job = {
  __typename?: 'Job';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  logs?: Maybe<Log>;
  name: Scalars['String'];
  projectId: Scalars['ID'];
  status: Scalars['String'];
};

/** A log is a message that is created during a job. */
export type Log = {
  __typename?: 'Log';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  jobId: Scalars['ID'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  runJob: Job;
  runPipeline: Project;
};


export type MutationRunJobArgs = {
  jobName?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['ID']>;
};


export type MutationRunPipelineArgs = {
  projectId?: InputMaybe<Scalars['ID']>;
};

/** A project is a collection of jobs. */
export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  logs?: Maybe<Log>;
  name: Scalars['String'];
  path: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<Job>;
  jobs: Array<Job>;
  log?: Maybe<Log>;
  logs: Array<Log>;
  project?: Maybe<Project>;
  projects: Array<Project>;
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

export type ProjectFragmentFragment = { __typename?: 'Project', id: string, name: string, path: string, createdAt: string };

export type LogFragmentFragment = { __typename?: 'Log', id: string, message: string, createdAt: string };

export type JobFragmentFragment = { __typename?: 'Job', id: string, projectId: string, name: string };

export type RunJobMutationVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>;
  jobName?: InputMaybe<Scalars['String']>;
}>;


export type RunJobMutation = { __typename?: 'Mutation', runJob: { __typename?: 'Job', id: string, projectId: string, name: string, status: string, createdAt: string } };

export type GetJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, projectId: string, name: string }> };

export type GetJobQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetJobQuery = { __typename?: 'Query', job?: { __typename?: 'Job', id: string, projectId: string, name: string, status: string, createdAt: string, logs?: { __typename?: 'Log', id: string, message: string } | null } | null };

export type GetLogsQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>;
  jobId?: InputMaybe<Scalars['ID']>;
}>;


export type GetLogsQuery = { __typename?: 'Query', logs: Array<{ __typename?: 'Log', id: string, message: string, createdAt: string }> };

export type RunPipelineMutationVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>;
}>;


export type RunPipelineMutation = { __typename?: 'Mutation', runPipeline: { __typename?: 'Project', id: string, name: string, path: string, createdAt: string } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, path: string, createdAt: string }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, path: string, createdAt: string, logs?: { __typename?: 'Log', id: string, message: string } | null } | null };

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
  projectId
  name
}
    `;
export const RunJobDocument = gql`
    mutation RunJob($projectId: ID, $jobName: String) {
  runJob(projectId: $projectId, jobName: $jobName) {
    id
    projectId
    name
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
    projectId
    name
    status
    createdAt
    logs {
      id
      message
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
export const RunPipelineDocument = gql`
    mutation RunPipeline($projectId: ID) {
  runPipeline(projectId: $projectId) {
    id
    name
    path
    createdAt
  }
}
    `;
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
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
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
    logs {
      id
      message
    }
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