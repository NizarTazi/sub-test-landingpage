export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZmMDYzMjA0MzY1MjZiNTUzZDUxMzUi_pc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        return res.status(response.status).json(data);
      } catch (error) {
        return res.status(500).json({ error: 'Error forwarding to Pabbly' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }