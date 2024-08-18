import { ApolloClient,ApolloLink,concat,createHttpLink,gql, InMemoryCache } from "@apollo/client";
//import { GraphQLClient} from "graphql-request";
import { getAccessToken } from "../auth";

//const client = new GraphQLClient('http://localhost:9000/graphql',{
   // headers: () => {
  //     const accessToken =  getAccessToken();
  //     if (accessToken){
  //      return {'Authorization': `Bearer ${accessToken}`};
   //    }
   //    return{};
   // }
//});

const httpLink = createHttpLink({uri: 'http://localhost:9000/graphql'});

const authLink = new ApolloLink((operation, forward) => {
    const accessToken =  getAccessToken();
    if (accessToken){
        operation.setContext({
            headers:{'Authorization': `Bearer ${accessToken}`},
        })
     }
    return forward(operation);
})
export const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
});

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        date
        title
        company{
            id
            name
        }
        description
    }
`;

export const companyByIdQuery = gql` #useQueryHOOK in React
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

export const jobByIdQuery = gql`
    query JobById($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}  #expression 
`;

export const jobsQuery = gql`
  query jobs ($limit: Int, $offset: Int ) {
    jobs (limit: $limit, offset: $offset) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export const createJobMutation = gql`
    mutation createJob($input: createJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;


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
    const { data } = await apolloClient.query({
        query,
        variables: { id },
    })
    return data.company;
}


export async function getJob(id) {
    
    const { data } = await apolloClient.query({
        query: jobByIdQuery,
        variables: { id },
    })
    return data.job;
}

export async function getJobs() {
    const query = gql`
        query Jobs {
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
    const { data } = await apolloClient.query({ 
        query,
        fetchPolicy: 'network-only',
     });
    return data.jobs;
}
