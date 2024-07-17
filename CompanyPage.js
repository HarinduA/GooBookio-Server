
import { useParams } from 'react-router';
import JobList from '../components/JobList';
import { useCompany } from '../lib/graphql/Hook';


function CompanyPage() {
  const { companyId } = useParams();
  //const {data, loading, error} = useQuery(companyByIdQuery, { // useQueryHOOK in React
  //  variables: { id: companyId },// useQueryHOOK in React
  //});
  const {company, loading, error} = useCompany(companyId); // cutom HOOK React 
  
  
  console.log('[CompanyPage]',{company, loading, error} ); // custom HOOK React    
  //{data, loading, error} );// useQueryHOOK in React
  if (loading) {
    return <div>Loading......</div>;
  }
  if (error){
    return<div className='has-text-danger'>Data unavailable</div>
  }
  //const {company} = data; // useQueryHOOK in React
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h2 className="title is 5">
        jobs at {company.name}

      </h2>
      <JobList jobs={company.jobs}/>
    </div>
  );
}

export default CompanyPage;
