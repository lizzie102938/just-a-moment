try {
  require('next/dist/compiled/sharp');
  console.log('✅ Sharp is available to Next.js');
} catch (err) {
  console.log('❌ Sharp is NOT available to Next.js');
}
