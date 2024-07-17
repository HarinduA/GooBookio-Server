import { useQuery } from '@apollo/client';
import { companyByIdQuery, jobByIdQuery, jobsQuery } from './queries';  // Updated the path to match your directory structure

export function useCompany(id) {
    const { data, loading, error } = useQuery(companyByIdQuery, { // custom HOOK in React
      variables: { id }, // custom HOOK in React
    });
    return { company: data?.company, loading, error: Boolean(error) };
}


export function useJob(id) {
    const { data, loading, error } = useQuery(jobByIdQuery, { // custom HOOK in React
      variables: { id }, // custom HOOK in React
    });
    return { job: data?.job, loading, error: Boolean(error) };
}

export function useJobs() {
    const { data, loading, error } = useQuery(jobsQuery, { // custom HOOK in React
      fetchPolicy: 'network-only',
    });
    return { jobs: data?.jobs, loading, error: Boolean(error) };
}
 

