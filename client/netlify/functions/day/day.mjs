import dayjs from 'dayjs';

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
	'Access-Control-Allow-Credentials': true
  };

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (req, context) => {
  try {
	return new Response(JSON.stringify({ message: `It's ${dayjs().format() }!`}), {
		status: 200,
		headers
	});
  } catch (error) {
	return new Response(error.toString(), {
		status: 500,
		headers
	})
  }	
}
