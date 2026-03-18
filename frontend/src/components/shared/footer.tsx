import Container from "../layout/container";

function Footer() {
  return (
    <div className=" absolute bottom-0 left-0 w-full py-5 border-t z-10 bg-card">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-full" />
            <p className="text-sm font-secondary">Ready to link device</p>
          </div>
          <div>
            <p className="text-sm font-secondary">
              WaSend v1.0.4 • Secure Connection
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
