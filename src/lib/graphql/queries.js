import { GraphQLClient, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const client = new GraphQLClient('http://localhost:9000/graphql',{
    headers: () => {
       const accessToken =  getAccessToken();
       if (accessToken){
        return {'Authorization': `Bearer ${accessToken}`};
       }
       return{};
    }
} );

export async function createJob({ title, description }) {
    const mutation = gql`
        mutation createJob($input: createJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const { job } = await client.request(mutation, {
        input: { title, description },
    });
    return job;
}

export async function getCompany(id) {
    const query = gql`
        query companyById($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    date
                    title
                }
            }
        }
    `;
    const { company } = await client.request(query, { id });
    return company;
}

export async function getJob(id) {
    const query = gql`
        query JobById($id: ID!) {
            job(id: $id) {
                id
                date
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;
    const { job } = await client.request(query, { id });
    return job;
}

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                date
                title
                company {
                    id
                    name
                }
            }
        }
    `;
    const { jobs } = await client.request(query);
    return jobs;
}
