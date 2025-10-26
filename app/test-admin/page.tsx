export const dynamic = 'force-dynamic'

export default function TestAdmin() {
  console.log('🎯 TEST PAGE LOADED!')
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, black, #1a1a1a)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      ✅ TEST PAGE WORKING - NO CLERK CHECKS
    </div>
  )
}
