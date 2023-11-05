import faunadb from 'faunadb';
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

// FQL functions
const {
    Ref,
    Paginate,
    Get,
    Match,
    Select,
    Index,
    Create,
    Collection,
    Join,
    Call,
    Function: Fn,
} = faunadb.query;

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
	'Access-Control-Allow-Credentials': true
  };

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (req, context) => {
  try {
	console.log("d");
	const result = await client.query(Get(Ref(Collection("food"), "380570465393967181")))
	console.log(result);

	return new Response(JSON.stringify({ message: result}), {
		status: 200,
		headers
	});
  } catch (error) {
	console.log(error)
	return new Response(error.toString(), {
		status: 500,
		headers
	})
  }	
  finally {
	client.close();
  }
}
